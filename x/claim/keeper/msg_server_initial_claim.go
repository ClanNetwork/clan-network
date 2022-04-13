package keeper

import (
	"context"

	"github.com/ClanNetwork/clan-network/x/claim/types"

	"github.com/cosmos/cosmos-sdk/codec/legacy"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/legacy/legacytx"
)

func (k msgServer) InitialClaim(goCtx context.Context, msg *types.MsgInitialClaim) (*types.MsgInitialClaimResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if msg.Signature == "" || msg.Signed == "" {
		return nil, types.ErrInvalidInitialClaimRequest
	}

	txBytes := []byte(msg.Signed)
	sigBytes := []byte(msg.Signature)

	stdSignDoc := legacytx.StdSignDoc{}
	stdSignature := legacytx.StdSignature{}

	legacy.Cdc.UnmarshalJSON(txBytes, &stdSignDoc)
	legacy.Cdc.UnmarshalJSON(sigBytes, &stdSignature)

	stdFee := legacytx.StdFee{}
	legacy.Cdc.UnmarshalJSON(stdSignDoc.Fee, &stdFee)

	msgClan := types.MsgClaimAddressSigned{}
	types.Amino.UnmarshalJSON(stdSignDoc.Msgs[0], &msgClan)
	msgs := []sdk.Msg{&msgClan}

	clanAddr, err := sdk.AccAddressFromBech32(msgClan.Value)

	if err != nil {
		return nil, types.ErrInvalidClaimAddress
	}

	signed := legacytx.StdSignBytes(stdSignDoc.ChainID, stdSignDoc.AccountNumber, stdSignDoc.Sequence, stdSignDoc.TimeoutHeight, stdFee, msgs, stdSignDoc.Memo)

	valid := stdSignature.VerifySignature(signed, stdSignature.GetSignature())

	if valid {
		addr := sdk.AccAddress(stdSignature.Address())

		params := k.GetParams(ctx)
		if !params.IsAirdropEnabled(ctx.BlockTime()) {
			return nil, types.ErrAirdropNotEnabled
		}
		coins, err := k.Keeper.InitClaimCoinsForAllAction(ctx, addr, clanAddr)
		if err != nil {
			return nil, err
		}
		ctx.EventManager().EmitEvent(
			sdk.NewEvent(
				sdk.EventTypeMessage,
				sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
				sdk.NewAttribute(sdk.AttributeKeySender, msg.Creator),
			),
		)
		return &types.MsgInitialClaimResponse{
			ClaimedAmount: coins,
		}, nil
	}
	return nil, types.ErrUnauthorizedClaimer
}
