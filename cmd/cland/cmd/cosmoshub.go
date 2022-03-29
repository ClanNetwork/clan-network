package cmd

import (
	"encoding/json"
	"fmt"
	claimtypes "github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/spf13/cobra"
	"io/ioutil"
)

const (
	MaxCap       = 50000000000
	MinStaked    = 35000000
	DefaultDenom = "uclan"
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
	AirdropOwnershipPercent sdk.Dec `json:"staked_ownership_percent"`
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
		Use:   "export-hub-snapshot [input-genesis-file] [clan-allocation]",
		Args:  cobra.ExactArgs(2),
		Short: "Export snapshot from a provided Cosmos Hub genesis export",
		Long: `Export snapshot from a provided Cosmos Hub genesis export
Example:
	cland export-hub-snapshot genesis.json hub-snapshot.json
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			clientCtx := client.GetClientContextFromCmd(cmd)
			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config
			config.SetRoot(clientCtx.HomeDir)

			genesisFile := args[0]
			clanAllocation := args[1]

			var snapshot Snapshot
			clanAllocationInt, ok := sdk.NewIntFromString(clanAllocation)
			if !ok {
				return fmt.Errorf("failed to parse clan-allocation to number: %s", clanAllocation)
			}
			snapshot.TotalClanAllocation = clanAllocationInt

			snapshot = exportSnapshotFromGenesisFile(clientCtx, genesisFile, snapshot)
			snapshotJSON, err := json.MarshalIndent(snapshot, "", "    ")
			if err != nil {
				return fmt.Errorf("failed to marshal snapshot: %w", err)
			}

			fmt.Printf(string(snapshotJSON[:]))

			return err

		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// compare balance with max cap
func accountedForBalance(balance sdk.Int) sdk.Int {
	if balance.LT(sdk.NewInt(MinStaked)) {
		return sdk.ZeroInt()
	}

	return sdk.MinInt(balance, sdk.NewInt(MaxCap))
}

func getDenominator(snapshotAccs map[string]SnapshotAccount) sdk.Int {
	denominator := sdk.ZeroInt()
	for _, acc := range snapshotAccs {
		denominator = denominator.Add(accountedForBalance(acc.StakedBalance))

	}
	return denominator
}

func exportSnapshotFromGenesisFile(clientCtx client.Context, genesisFile string, snapshot Snapshot) Snapshot {
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

	totalAccountedForAmount := getDenominator(snapshotAccs)
	totalAirdropAccounts := 0
	for _, acc := range snapshotAccs {
		currAccBalance := acc.StakedBalance
		curAccountedFor := accountedForBalance(currAccBalance).ToDec()
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
