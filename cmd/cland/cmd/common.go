package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	claimtypes "github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"
)

const (
	flagOutputFile = "outputFile"
)


type Snapshot struct {
	Accounts                      map[string]SnapshotAccount `json:"accounts"`
	TotalAirdropAccounts          int                    	 `json:"total_airdrop_accounts"`
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

				records := claimRecordsFromSnapshot(snapshot)
				claimRecords = append(claimRecords, records...)
			}

			claimRecordsJSON, err := json.MarshalIndent(claimRecords, "", "    ")
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

func claimRecordsFromSnapshot(snapshot Snapshot) []claimtypes.ClaimRecord {
	claimRecords := make([]claimtypes.ClaimRecord, snapshot.TotalAirdropAccounts)

	i := 0
	for _, acc := range snapshot.Accounts {
		if acc.AirdropOwnershipPercent.GT(sdk.NewDec(0)) {
			clanAlloc := acc.AirdropOwnershipPercent.MulInt(snapshot.TotalClanAllocation)
			claimRecords[i] = claimtypes.ClaimRecord{
				Address: acc.Address,
				InitialClaimableAmount: sdk.Coins{sdk.Coin{
					Denom:  DefaultDenom,
					Amount: clanAlloc.RoundInt(),
				}},
				ActionCompleted: []bool{false, false, false, false, false},
			}

			i++
		}
	}

	return claimRecords
}

