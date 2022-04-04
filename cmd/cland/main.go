package main

import (
	"os"

	"github.com/ClanNetwork/clan-network/app"
	airdrop "github.com/ClanNetwork/clan-network/cmd/cland/cmd"
	"github.com/cosmos/cosmos-sdk/server"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	"github.com/tendermint/starport/starport/pkg/cosmoscmd"
)

func main() {
	rootCmd, encodingConfig := cosmoscmd.NewRootCmd(
		app.Name,
		app.AccountAddressPrefix,
		app.DefaultNodeHome,
		app.Name,
		app.ModuleBasics,
		app.New,
		// this line is used by starport scaffolding # root/arguments
	)

	// add rosetta commands
	rootCmd.AddCommand(
		server.RosettaCommand(encodingConfig.InterfaceRegistry, encodingConfig.Marshaler),
	)
	rootCmd.AddCommand(airdrop.ExportSnapshotCmd())
	rootCmd.AddCommand(airdrop.SnapshotToClaimRecordsCmd())
	rootCmd.AddCommand(airdrop.ExportTangoSnapshotCmd())
	rootCmd.AddCommand(airdrop.SnapshotToClaimEthRecordsCmd())
	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}
