package cmd

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/spf13/cobra"
)


func ExportTerraSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-terra-snapshot [airdrop-to-denom] [input-genesis-file] [output-snapshot-json]",
		Short: "Export snapshot from a provided Terra Mainnet genesis export",
		Long: `Export snapshot from a provided Terra Mainnet genesis export
Example:
	cland export-hub-snapshot genesis.json hub-snapshot.json
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			var clientCtx = client.GetClientContextFromCmd(cmd)
			cdc := clientCtx.Codec

			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)
	
			
			fmt.Printf("This logic needs to be implemented",cdc)
			return nil
			
		},
	}

	return cmd
}