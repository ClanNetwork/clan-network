package cli

import (
	"strconv"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdClaimableForAction() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "claimable-for-action [address] [action]",
		Short: "Query Claimable For Action",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqAddress := args[0]

			actionValue, ok := types.Action_value[args[1]]
			if !ok {
				panic("invalid action value")
			}

			reqAction := types.Action(actionValue)

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryClaimableForActionRequest{

				Address: reqAddress,
				Action:  reqAction,
			}

			res, err := queryClient.ClaimableForAction(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
