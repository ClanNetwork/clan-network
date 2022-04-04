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

func CmdClaimForEthAddress() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "claim-from-eth-address message signature",
		Short: "Claim From Eth Address",
		Long:  "Send clan address (message arg) signed by claimable ethereum address (address will be derived from sig)",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argMessage := args[0]
			argSignature := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgClaimForEthAddress(
				clientCtx.GetFromAddress().String(),
				argMessage,
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
