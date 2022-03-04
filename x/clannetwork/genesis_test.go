package clannetwork_test

import (
	"testing"

	keepertest "github.com/ClanNetwork/clan-network/testutil/keeper"
	"github.com/ClanNetwork/clan-network/testutil/nullify"
	"github.com/ClanNetwork/clan-network/x/clannetwork"
	"github.com/ClanNetwork/clan-network/x/clannetwork/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ClannetworkKeeper(t)
	clannetwork.InitGenesis(ctx, *k, genesisState)
	got := clannetwork.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
