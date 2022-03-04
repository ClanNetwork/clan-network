package keeper_test

import (
	"testing"

	testkeeper "github.com/ClanNetwork/clan-network/testutil/keeper"
	"github.com/ClanNetwork/clan-network/x/clannetwork/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ClannetworkKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
