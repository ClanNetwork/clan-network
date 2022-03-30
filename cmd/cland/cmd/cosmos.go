package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"

	claimtypes "github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/spf13/cobra"
)

const (
	DefaultDenom = "uclan"
	flagWhalecap = "whalecap"
	flagMinStaked = "minStaked"
)

type Snapshot struct {
	Accounts                      map[string]SnapshotAccount `json:"accounts"`
	TotalAirdropAccounts          uint64                     `json:"total_airdrop_accounts"`
	TotalAccountedForStakedAmount sdk.Int                    `json:"total_accounted_for_amount"`
	TotalStakedAmount             sdk.Int                    `json:"total_staked_amount"`
	TotalClanAllocation           sdk.Int                    `json:"total_allocated_clan"`
}

// SnapshotAccount provide fields of snapshot per account
type SnapshotAccount struct {
	Address                 string  `json:"cosmoshub_address"`
	StakedBalance           sdk.Int `json:"staked_balance"`
	StakedForAirdropBalance sdk.Int `json:"staked_for_airdrop"`
	AirdropOwnershipPercent sdk.Dec `json:"airdrop_ownership_percent"`
}

func SnapshotToClaimRecordsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "snapshot-to-claim-records [input-snapshot-file1] [input-snapshot-file2] ...",
		Short: "Transform a Cosmos Hub snapshot to a Claim module records",
		Long: `Transform a Cosmos Hub snapshot (or multiple) to Claim records in a format suitable for the Claim module genesis state
Example:
	cland snapshot-to-claim-records snapshot_atom.json snapshot_scrt.json ...
`,

		RunE: func(cmd *cobra.Command, args []string) error {
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
			fmt.Printf(string(claimRecordsJSON[:]))

			return nil
		}}
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

func ExportSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-snapshot [input-genesis-file] [output-genesis-file] [clan-allocation] --minStaked=[minStaked] --whalecap=[whalecap]",
		Args:  cobra.ExactArgs(3),
		Short: "Export snapshot from a provided Cosmos Hub genesis export",
		Long: `Export snapshot from a provided Cosmos Hub genesis export
Example:
	cland export-snapshot cosmoshub-genesis.json cosmoshub-snapshot-output.json --whalecap=50000000000
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			clientCtx := client.GetClientContextFromCmd(cmd)
			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config
			config.SetRoot(clientCtx.HomeDir)

			genesisFile := args[0]
			outputFile := args[1]
			clanAllocation := args[2]

			minStaked := int64(0)

			// Parse CLI input for juno supply
			whalecapStr, err := cmd.Flags().GetString(flagWhalecap)
			if err != nil {
				return fmt.Errorf("failed to get whalecap: %w", err)
			}

			minStakedStr, err := cmd.Flags().GetString(flagMinStaked)
			if err == nil && len(minStakedStr) > 0 {
				minStaked, err = strconv.ParseInt(minStakedStr, 10, 64)
				if err != nil {
					return fmt.Errorf("failed to parse minStaked: %s %w", minStakedStr, err)
				}
			}

			whalecap, err := strconv.ParseInt(whalecapStr, 10, 64)
			if err != nil {
				return fmt.Errorf("failed to parse whalecap: %s %w", whalecapStr, err)
			}

			var snapshot Snapshot
			clanAllocationInt, ok := sdk.NewIntFromString(clanAllocation)
			if !ok {
				return fmt.Errorf("failed to parse clan-allocation to number: %s", clanAllocation)
			}
			snapshot.TotalClanAllocation = clanAllocationInt

			fmt.Printf("Exporting snapshot. whalecap: %d min staked: %d",whalecap, minStaked)
			snapshot = exportSnapshotFromGenesisFile(clientCtx, genesisFile, snapshot, whalecap, minStaked)
			snapshotJSON, err := json.MarshalIndent(snapshot, "", "    ")
			if err != nil {
				return fmt.Errorf("failed to marshal snapshot: %w", err)
			}

			err = ioutil.WriteFile(outputFile, snapshotJSON, 0600)
			return err

		},
	}

	cmd.Flags().String(flagWhalecap, "", "SCRT/LUNA/ATOM whale cap")
	cmd.Flags().String(flagMinStaked, "", "SCRT/LUNA/ATOM minimun staked")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// compare balance with max cap
func accountedForBalance(balance sdk.Int, minStaked int64 ,whalecap int64) sdk.Int {
	if balance.LT(sdk.NewInt(minStaked)) {
		return sdk.ZeroInt()
	}

	return sdk.MinInt(balance, sdk.NewInt(whalecap))
}

func getDenominator(snapshotAccs map[string]SnapshotAccount, minStaked int64, whalecap int64) sdk.Int {
	denominator := sdk.ZeroInt()
	for _, acc := range snapshotAccs {
		denominator = denominator.Add(accountedForBalance(acc.StakedBalance, minStaked, whalecap))

	}
	return denominator
}

func exportSnapshotFromGenesisFile(clientCtx client.Context, genesisFile string, snapshot Snapshot, whalecap int64,minStaked int64) Snapshot {
	appState, _, _ := genutiltypes.GenesisStateFromGenFile(genesisFile)
	stakingGenState := stakingtypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)

	snapshotAccs := make(map[string]SnapshotAccount)
	validators := make(map[string]stakingtypes.Validator)
	for _, validator := range stakingGenState.Validators {
		validators[validator.OperatorAddress] = validator
	}

	totalStaked := sdk.ZeroInt()
	for _, delegation := range stakingGenState.Delegations {
		address := delegation.DelegatorAddress

		acc, ok := snapshotAccs[address]
		if !ok {
			acc = SnapshotAccount{
				Address:                 address,
				StakedBalance:           sdk.ZeroInt(),
				StakedForAirdropBalance: sdk.ZeroInt(),
				AirdropOwnershipPercent: sdk.ZeroDec(),
			}
		}

		val := validators[delegation.ValidatorAddress]
		staked := delegation.Shares.MulInt(val.Tokens).Quo(val.DelegatorShares).RoundInt()
		acc.StakedBalance = acc.StakedBalance.Add(staked)
		snapshotAccs[address] = acc

		totalStaked = totalStaked.Add(staked)
	}

	totalAccountedForAmount := getDenominator(snapshotAccs,minStaked, whalecap)
	totalAirdropAccounts := 0
	for _, acc := range snapshotAccs {
		currAccBalance := acc.StakedBalance
		curAccountedFor := accountedForBalance(currAccBalance,minStaked, whalecap).ToDec()
		acc.StakedForAirdropBalance = curAccountedFor.RoundInt()
		acc.AirdropOwnershipPercent = curAccountedFor.QuoInt(totalAccountedForAmount)

		if curAccountedFor.GT(sdk.ZeroDec()) {
			totalAirdropAccounts = totalAirdropAccounts + 1
		}

		snapshotAccs[acc.Address] = acc
	}

	snapshot.Accounts = snapshotAccs
	snapshot.TotalAirdropAccounts = uint64(totalAirdropAccounts)
	snapshot.TotalAccountedForStakedAmount = totalAccountedForAmount
	snapshot.TotalStakedAmount = totalStaked

	return snapshot
}
