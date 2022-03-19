package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/spf13/cobra"
)

const (
	MaxCap                 = 50000000000
	MinStaked                 = 35000000
	TotalClanAirdropAmount = 80000000000000 
	DefaultDenom = "uclan"
)

type HubSnapshot struct {
	Accounts map[string]HubSnapshotAccount `json:"accounts"`
	TotalAtomAmount        sdk.Int `json:"total_atom_amount"`
	TotalAllocatedClanAmount sdk.Int `json:"total_allocated_clan"`
	TotalAccounts         uint64  `json:"total_accounts"`
}

// HubSnapshotAccount provide fields of snapshot per account
type HubSnapshotAccount struct {
	CosmosHubAddress       string `json:"cosmoshub_address"`
	ClanBalance sdk.Int `json:"clan_balance"`
	AtomOwnershipPercent sdk.Dec `json:"atom_ownership_percent"`
	AtomStakedBalance   sdk.Int `json:"atom_staked_balance"`
	AtomStakedBalanceForAirdrop   sdk.Int `json:"atom_staked_balance_for_airdrop"`
}

type Account struct {
	Address       string `json:"address,omitempty"`
	AccountNumber uint64 `json:"account_number,omitempty"`
	Sequence      uint64 `json:"sequence,omitempty"`
}


func ExportHubSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-hub-snapshot [input-genesis-file] [output-snapshot-json]",
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
			snapshotOutput := args[1]

			// Read genesis file
			genesisJSON, err := os.Open(genesisFile)
			if err != nil {
				return err
			}
			defer genesisJSON.Close()

			var snapshot HubSnapshot
			snapshot.Accounts = make(map[string]HubSnapshotAccount)
			snapshot.TotalAllocatedClanAmount = sdk.ZeroInt()

			snapshot = exportSnapShotFromGenesisFile(clientCtx, genesisFile, "uatom",snapshot)
			// export snapshot json
			snapshotJSON, err := json.MarshalIndent(snapshot, "", "    ")
			if err != nil {
				return fmt.Errorf("failed to marshal snapshot: %w", err)
			}

			err = ioutil.WriteFile(snapshotOutput, snapshotJSON, 0600)
			return err
			
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// compare balance with max cap
func getMin(balance sdk.Dec) sdk.Dec {
	if balance.GTE(sdk.NewDec(MaxCap)) {
		return sdk.NewDec(MaxCap)
	} else {
		return balance
	}
}


func getDenominator(snapshotAccs	map[string]HubSnapshotAccount) sdk.Int {
	denominator := sdk.ZeroInt()
	for _, acc := range snapshotAccs {
		curAccBalance := acc.AtomStakedBalance.ToDec()

		if curAccBalance.LT(sdk.NewDec(MinStaked)) {
			continue
		}

		denominator = denominator.Add(getMin(curAccBalance).RoundInt())

	}
	return denominator
}


func exportSnapShotFromGenesisFile(clientCtx client.Context, genesisFile string, denom string, snapshot HubSnapshot) HubSnapshot {
	appState, _, _ := genutiltypes.GenesisStateFromGenFile(genesisFile)
	stakingGenState := stakingtypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)
	authGenState := authtypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)

	snapshotAccs := make(map[string]HubSnapshotAccount)
	for _, account := range authGenState.GetAccounts() {
		if account.TypeUrl == "/cosmos.auth.v1beta1.BaseAccount" {
			_, ok := account.GetCachedValue().(authtypes.GenesisAccount)
			if ok {
				var byteAccounts []byte

				byteAccounts, err := codec.NewLegacyAmino().MarshalJSON(account.GetCachedValue())
				if err != nil {
					fmt.Printf("No account found for bank balance %s \n", string(byteAccounts))
					fmt.Println(err.Error())
					continue
				}
				var accountAfter Account
				if err := codec.NewLegacyAmino().UnmarshalJSON(byteAccounts, &accountAfter); err != nil {
					continue
				}

				snapshotAccs[accountAfter.Address] = HubSnapshotAccount{
					CosmosHubAddress:         accountAfter.Address,
					AtomStakedBalance:   sdk.ZeroInt(),
				}
			}
		}
	}


	// Make a map from validator operator address to the v42 validator type
	validators := make(map[string]stakingtypes.Validator)
	for _, validator := range stakingGenState.Validators {
		validators[validator.OperatorAddress] = validator
	}

	for _, delegation := range stakingGenState.Delegations {
		address := delegation.DelegatorAddress

		acc, ok := snapshotAccs[address]
		if !ok {
			fmt.Printf("No account found for delegation address %s \n", address)
			continue
		}

		val := validators[delegation.ValidatorAddress]
		stakedAtoms := delegation.Shares.MulInt(val.Tokens).Quo(val.DelegatorShares).RoundInt()
		acc.AtomStakedBalance = acc.AtomStakedBalance.Add(stakedAtoms)

		snapshotAccs[address] = acc
	}

	denominator := getDenominator(snapshotAccs)
	totalBalance := sdk.ZeroInt()
	totalAtomBalance := sdk.NewInt(0)
	totalAccounts := 0
	for address, acc := range snapshotAccs {
		currAccBalance := acc.AtomStakedBalance.ToDec()
		currAccBalanceMin := getMin(currAccBalance)

		if denominator.IsZero() {
			acc.AtomOwnershipPercent = sdk.NewInt(0).ToDec()
		} else {
			acc.AtomOwnershipPercent = currAccBalanceMin.QuoInt(denominator)
			
		}

		if currAccBalance.IsZero() {
			acc.ClanBalance = sdk.ZeroInt()
			snapshotAccs[address] = acc
			continue
		}

		if currAccBalance.LT(sdk.NewDec(MinStaked)) {
			acc.ClanBalance = sdk.ZeroInt()
			snapshotAccs[address] = acc
			continue
		}
	
		acc.ClanBalance = acc.AtomOwnershipPercent.MulInt(sdk.NewInt(TotalClanAirdropAmount)).RoundInt()
		totalBalance = totalBalance.Add(acc.ClanBalance)
		totalAtomBalance = totalAtomBalance.Add(acc.AtomStakedBalance)
		totalAccounts = totalAccounts + 1
		snapshotAccount, exists := snapshot.Accounts[address]

		if !exists {
			snapshot.Accounts[address] = acc
		} else {
			fmt.Printf("No account exists")
			if snapshotAccount.ClanBalance.IsNil() {
				snapshotAccount.ClanBalance = sdk.ZeroInt()
			}

			snapshotAccount.ClanBalance = snapshotAccount.ClanBalance.Add(acc.ClanBalance)
			snapshotAccount.AtomStakedBalance = snapshotAccount.AtomStakedBalance.Add(acc.AtomStakedBalance)
			snapshot.Accounts[address] = snapshotAccount
		}
	}

	snapshot.TotalAtomAmount = totalAtomBalance
	snapshot.TotalAllocatedClanAmount = snapshot.TotalAllocatedClanAmount.Add(totalBalance)
	snapshot.TotalAccounts = uint64(totalAccounts)

	fmt.Printf("Complete read genesis file %s \n", genesisFile)
	fmt.Printf("# accounts: %d\n", totalAccounts)
	fmt.Printf("total atom supply read from genesis: %s\n", totalAtomBalance.String())
	fmt.Printf("total clan allocated in airdrop: %s\n", totalBalance.String())
	return snapshot
}

