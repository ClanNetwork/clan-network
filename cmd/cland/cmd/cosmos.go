package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"

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


func ExportSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-snapshot [input-genesis-file] [output-genesis-file] [clan-allocation] [exchanges-file] --minStaked=[minStaked] --whalecap=[whalecap]",
		Args:  cobra.ExactArgs(4),
		Short: "Export snapshot from a provided cosmos genesis export",
		Long: `Export snapshot from a provided cosmos genesis export
			   Example:
			   cland export-snapshot airdrop-snapshot-cosmoshub.json airdrop-snapshot-cosmoshub-output.json exchanges-cosmoshub.json 80000000000000 --minStaked=35000000 --whalecap=50000000000
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			clientCtx := client.GetClientContextFromCmd(cmd)
			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config
			config.SetRoot(clientCtx.HomeDir)

			genesisFile := args[0]
			outputFile := args[1]
			clanAllocation := args[2]
			exchangesFile := args[3]

			minStaked := int64(0)

			whalecapStr, err := cmd.Flags().GetString(flagWhalecap)
			if err != nil {
				return fmt.Errorf("failed to get whalecap: %w", err)
			}

			// Read minStaked flag
			minStakedStr, err := cmd.Flags().GetString(flagMinStaked)
			if err == nil && len(minStakedStr) > 0 {
				minStaked, err = strconv.ParseInt(minStakedStr, 10, 64)
				if err != nil {
					return fmt.Errorf("failed to parse minStaked: %s %w", minStakedStr, err)
				}
			}

			// Read whalecap flag
			whalecap, err := strconv.ParseInt(whalecapStr, 10, 64)
			if err != nil {
				return fmt.Errorf("failed to parse whalecap: %s %w", whalecapStr, err)
			}

			// Read exchanges file
			exchangeJSON, err := os.Open(exchangesFile)
			if err != nil {
				return err
			}
			defer exchangeJSON.Close()

			exchangeBytes, _ := ioutil.ReadAll(exchangeJSON)
			var exchangeAddresses []string
			err = json.Unmarshal(exchangeBytes, &exchangeAddresses)
			if err != nil {
				return err
			}

			exchangesMap := make(map[string]bool)
			for _, p := range exchangeAddresses {
				exchangesMap[p] = true
			}


			var snapshot Snapshot
			clanAllocationInt, ok := sdk.NewIntFromString(clanAllocation)
			if !ok {
				return fmt.Errorf("failed to parse clan-allocation to number: %s", clanAllocation)
			}

			snapshot.TotalClanAllocation = clanAllocationInt

			fmt.Printf("Exporting snapshot with whalecap: %d and min staked %d params...", whalecap, minStaked)
			snapshot = exportSnapshotFromGenesisFile(clientCtx, genesisFile, snapshot, whalecap, minStaked, exchangesMap)
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

func exportSnapshotFromGenesisFile(clientCtx client.Context, genesisFile string, snapshot Snapshot, whalecap int64, minStaked int64,exchangesMap map[string]bool) Snapshot {
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

		// Skip delegations to exchanges
		if exchangesMap[delegation.ValidatorAddress] {
			fmt.Printf("Found staker %s for on exchange validator %s,skiping..\n", address, delegation.ValidatorAddress)
			continue
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
		acc.ClanAllocation = acc.AirdropOwnershipPercent.MulInt(snapshot.TotalClanAllocation).RoundInt()

		if curAccountedFor.GT(sdk.ZeroDec()) {
			totalAirdropAccounts = totalAirdropAccounts + 1
		}

		snapshotAccs[acc.Address] = acc
	}

	snapshot.Accounts = snapshotAccs
	snapshot.TotalAirdropAccounts = totalAirdropAccounts
	snapshot.TotalAccountedForStakedAmount = totalAccountedForAmount
	snapshot.TotalStakedAmount = totalStaked

	return snapshot
}
