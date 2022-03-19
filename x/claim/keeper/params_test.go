package keeper_test

import (
	"testing"

	testkeeper "github.com/ClanNetwork/clan-network/testutil/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ClaimKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params.AirdropEnabled, k.AirdropEnabled(ctx))
	require.EqualValues(t, params.DurationUntilDecay, k.DurationUntilDecay(ctx))
	require.EqualValues(t, params.DurationOfDecay, k.DurationOfDecay(ctx))
	require.EqualValues(t, params.ClaimDenom, k.ClaimDenom(ctx))
}
