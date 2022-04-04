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

func createTestActionRecord(keeper *keeper.Keeper, ctx sdk.Context) types.ActionRecord {
	item := types.ActionRecord{}
	keeper.SetActionRecord(ctx, item)
	return item
}

func TestActionRecordGet(t *testing.T) {
	keeper, ctx := keepertest.ClaimKeeper(t)
	item := createTestActionRecord(keeper, ctx)

	addr, _ := sdk.AccAddressFromBech32(item.Address)
	rst, found := keeper.GetActionRecord(ctx, addr)
	require.True(t, found == nil)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}
