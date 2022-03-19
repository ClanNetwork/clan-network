package cmd

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/spf13/cobra"
)


func AddAirdropCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-airdrop [airdrop-snapshot-file]",
		Short: "Add balances of accounts to claim module.",
		Args:  cobra.ExactArgs(1),
		Long: fmt.Sprintf(`Add balances of accounts to claim module.
Example:
$ %s add-airdrop /path/to/snapshot.json
`, version.AppName),

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