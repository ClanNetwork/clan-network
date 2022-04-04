package keeper

import (
	"context"
	"fmt"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

func (k msgServer) ClaimForEthAddress(goCtx context.Context, msg *types.MsgClaimForEthAddress) (*types.MsgClaimForEthAddressResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	messageData := []byte(msg.Message)
	signatureData, _ := hexutil.Decode(msg.Signature)

	address, err := EcRecover(messageData, signatureData)
	if err != nil {
		return nil, err
	}

	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return nil, types.ErrAirdropNotEnabled
	}

	addr, err := sdk.AccAddressFromBech32(msg.Message)
	if err != nil {
		return nil, err
	}

	coins, err := k.ClaimCoinsForEthAddress(ctx, address.Bytes(), addr)
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.AttributeValueCategory),
		),
	)
	return &types.MsgClaimForEthAddressResponse{
		ClaimedAmount: coins,
	}, nil
}

func EcRecover(data []byte, sig hexutil.Bytes) (common.Address, error) {
	if len(sig) != crypto.SignatureLength {
		return common.Address{}, fmt.Errorf("signature must be %d bytes long", crypto.SignatureLength)
	}
	if sig[crypto.RecoveryIDOffset] != 27 && sig[crypto.RecoveryIDOffset] != 28 {
		return common.Address{}, fmt.Errorf("invalid Ethereum signature (V is not 27 or 28)")
	}
	sig[crypto.RecoveryIDOffset] -= 27 // Transform yellow paper V from 27/28 to 0/1

	rpk, err := crypto.SigToPub(accounts.TextHash(data), sig)
	if err != nil {
		return common.Address{}, err
	}
	return crypto.PubkeyToAddress(*rpk), nil
}
