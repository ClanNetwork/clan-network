package cmd

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/spf13/cobra"
)


func ExportSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-snapshot [input-tango-snapshot] [input-secret-snapshot] [input-hub-snapshot] [input-terra-snapshot] [output-snapshot]",
		Short: "Export final snapshot from a provided snapshots",
		Long: `Export final snapshot from a provided snapshots
Example:
	cland export-snapshot hub-snapshot.json osmo-snapshot.json regen-snapshot.json snapshot.json
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