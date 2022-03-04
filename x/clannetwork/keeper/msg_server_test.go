package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/ClanNetwork/clan-network/testutil/keeper"
	"github.com/ClanNetwork/clan-network/x/clannetwork/keeper"
	"github.com/ClanNetwork/clan-network/x/clannetwork/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.ClannetworkKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
