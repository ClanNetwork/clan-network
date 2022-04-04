package cli

import (
	"strconv"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdInitialClaim() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "initial-claim [tx]",
		Short: "Claim Initial Amount",
		Long:  "Send a signed clan address (tx arg) by base64 tx (can be from other networks like Secret and Terra), if there is no tx the creator address will claim for itself",
		Args:  cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argSigned := args[0]
			argSignature := args[1]
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgInitialClaim(
				clientCtx.GetFromAddress().String(),
				argSigned,
				argSignature,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
