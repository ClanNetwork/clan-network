package keeper

import (
	"context"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ClaimEthRecord(c context.Context, req *types.QueryClaimEthRecordRequest) (*types.QueryClaimEthRecordResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	addr, err := hexutil.Decode(req.Address)
	if err != nil {
		return nil, err
	}

	claimEthRecord, err := k.GetClaimEthRecord(ctx, addr)

	return &types.QueryClaimEthRecordResponse{ClaimEthRecord: claimEthRecord}, err
}
