package cli

import (
	"context"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdShowClaimEthRecord() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-claim-eth-record [eth-address]",
		Short: "shows Claim Eth Record",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			reqAddress := args[0]

			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryClaimEthRecordRequest{
				Address: reqAddress,
			}

			res, err := queryClient.ClaimEthRecord(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
