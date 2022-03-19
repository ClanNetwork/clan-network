package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "github.com/ClanNetwork/clan-network/testutil/keeper"
	"github.com/ClanNetwork/clan-network/testutil/nullify"
	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
)

func createTestClaimEthRecord(keeper *keeper.Keeper, ctx sdk.Context) types.ClaimEthRecord {
	item := types.ClaimEthRecord{}
	keeper.SetClaimEthRecord(ctx, item)
	return item
}

func TestClaimEthRecordGet(t *testing.T) {
	keeper, ctx := keepertest.ClaimKeeper(t)
	item := createTestClaimEthRecord(keeper, ctx)
	rst, found := keeper.GetClaimEthRecord(ctx, []byte(item.Address))
	require.True(t, found == nil)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}
