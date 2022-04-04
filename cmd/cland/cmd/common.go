package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	claimtypes "github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/spf13/cobra"
)

const (
    flagOutputFile = "outputFile"
)


type Snapshot struct {
    Accounts                      map[string]SnapshotAccount `json:"accounts"`
    TotalAirdropAccounts          int                        `json:"total_airdrop_accounts"`
    TotalAccountedForStakedAmount sdk.Int                    `json:"total_accounted_for_amount"`
    TotalStakedAmount             sdk.Int                    `json:"total_staked_amount"`
    TotalClanAllocation           sdk.Int                    `json:"total_allocated_clan"`
}

// SnapshotAccount provide fields of snapshot per account
type SnapshotAccount struct {
    Address                 string  `json:"origin_address"`
    StakedBalance           sdk.Int `json:"staked_balance"`
    StakedForAirdropBalance sdk.Int `json:"staked_for_airdrop"`
    AirdropOwnershipPercent sdk.Dec `json:"airdrop_ownership_percent"`
}

type ClaimRecordsExport struct {
	Records 				[]claimtypes.ClaimRecord 	`json:"claim_records"`
	DuplicateAddresses 		[]DuplicateAddress 			`json:"duplicate_addresses"`
}

type DuplicateAddress struct {
	TransformedAddress  string `json:"transformed_address"`
	OriginalAddress  	string `json:"original_address"`
	Allocation  		sdk.Int `json:"allocation"`
}

func SnapshotToClaimRecordsCmd() *cobra.Command {
    cmd := &cobra.Command{
        Use:   "snapshot-to-claim-records [input-snapshot-file1] [input-snapshot-file2] ... --outputFile=[outputFile]",
        Short: "Transform a Cosmos Hub snapshot to a Claim module records",
        Long: `Transform a Cosmos Hub snapshot (or multiple) to Claim records
               in a format suitable for the Claim module genesis state
               Example:
               cland snapshot-to-claim-records snapshot_atom.json snapshot_scrt.json --outputFile=claim-records.json
            `,

        RunE: func(cmd *cobra.Command, args []string) error {
            outputFile, err := cmd.Flags().GetString(flagOutputFile)
            if err != nil {
                return fmt.Errorf("failed to get output file: %w", err)
            }

            var claimRecords []claimtypes.ClaimRecord
            var duplicateAddresses []DuplicateAddress
            existingAddresses := make(map[string]bool)
            for _, arg := range args {
                snapshotFile := arg
                snapshotJSON, err := ioutil.ReadFile(snapshotFile)
                if err != nil {
                    return err
                }

                var snapshot Snapshot
                err = json.Unmarshal(snapshotJSON, &snapshot)
                if err != nil {
                    return err
                }

                records, duplicates := claimRecordsFromSnapshot(snapshot, existingAddresses)

                for _, r := range records {
                    existingAddresses[r.ClaimAddress] = true
                }

                claimRecords = append(claimRecords, records...)
                duplicateAddresses = append(duplicateAddresses, duplicates...)
            }

			// Merge duplicate allocations
			for _, dup := range duplicateAddresses {
				addr := dup.TransformedAddress
				for i, claimRecord := range claimRecords {
					if addr == claimRecord.ClaimAddress {
						claimRecord.InitialClaimableAmount = claimRecord.InitialClaimableAmount.Add(sdk.Coin{
							Denom:  DefaultDenom,
							Amount: dup.Allocation,
						})
						claimRecords[i] = claimRecord
					}
				}
			}

			totalAllocated := sdk.ZeroInt()

			for _, record := range claimRecords {
				totalAllocated = totalAllocated.Add(record.InitialClaimableAmount.AmountOf(DefaultDenom))
			}

			fmt.Printf("Exporting %d claim records...\n", len(claimRecords))
			fmt.Printf("Found %d duplicate records\n", len(duplicateAddresses))
			fmt.Printf("Total CLAN allocated: %s \n", totalAllocated.String())

			claimRecordsExport := ClaimRecordsExport{ 
				Records:			claimRecords,
				DuplicateAddresses: duplicateAddresses,
			}

            claimRecordsJSON, err := json.MarshalIndent(claimRecordsExport, "", "    ")
            if err != nil {
                return err
            }

            err = ioutil.WriteFile(outputFile, claimRecordsJSON, 0600)

            return err
        }}

    cmd.Flags().String(flagOutputFile, "", "output file for the claim records")
    flags.AddQueryFlagsToCmd(cmd)
    return cmd
}

func convertCosmosAddressToClan(address string) (sdk.AccAddress, error) {
    config := sdk.GetConfig()
    prefix := config.GetBech32AccountAddrPrefix()

    _, bytes, err := bech32.DecodeAndConvert(address)
    if err != nil {
        return nil, err
    }

    newAddr, err := bech32.ConvertAndEncode(prefix, bytes)
    if err != nil {
        return nil, err
    }

    sdkAddr, err := sdk.AccAddressFromBech32(newAddr)
    if err != nil {
        return nil, err
    }

    return sdkAddr, nil
}

func claimRecordsFromSnapshot(snapshot Snapshot, existingAddresses map[string]bool) ([]claimtypes.ClaimRecord, []DuplicateAddress) {
    claimRecords := make([]claimtypes.ClaimRecord, snapshot.TotalAirdropAccounts)
	var duplicateAddresses []DuplicateAddress

    i := 0
    for _, acc := range snapshot.Accounts {
        if acc.AirdropOwnershipPercent.GT(sdk.NewDec(0)) {
            clanAlloc := acc.AirdropOwnershipPercent.MulInt(snapshot.TotalClanAllocation)
            clanAddress, err := convertCosmosAddressToClan(acc.Address)

            if err != nil {
                fmt.Printf("Error converting cosmos address to clan")
                panic(err)
            }

            exists := existingAddresses[clanAddress.String()]

            if exists {
				duplicateAddresses = append(duplicateAddresses, DuplicateAddress{
					TransformedAddress: clanAddress.String(),
					OriginalAddress: acc.Address,
					Allocation: clanAlloc.RoundInt(),
				})
                continue
            }

            claimRecords[i] = claimtypes.ClaimRecord{
                ClaimAddress: clanAddress.String(),
                InitialClaimableAmount: sdk.Coins{sdk.Coin{
                    Denom:  DefaultDenom,
                    Amount: clanAlloc.RoundInt(),
                }},
                ActionClaimed: []bool{false, false, false, false, false},
            }

            i++
        }
    }

    return claimRecords, duplicateAddresses
}


