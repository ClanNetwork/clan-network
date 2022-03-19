package claim

import (
	"time"

	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	k.CreateModuleAccount(ctx, genState.ModuleAccountBalance)
	if genState.Params.AirdropEnabled && genState.Params.AirdropStartTime.Equal(time.Time{}) {
		genState.Params.AirdropStartTime = ctx.BlockTime()
	}
	err := k.SetClaimRecords(ctx, genState.ClaimRecords)
	if err != nil {
		panic(err)
	}
	errEth := k.SetClaimEthRecords(ctx, genState.ClaimEthRecords)
	if errEth != nil {
		panic(errEth)
	}

	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	params := k.GetParams(ctx)

	genesis.ModuleAccountBalance = k.GetModuleAccountBalance(ctx)
	genesis.Params = params
	genesis.ClaimRecords = k.GetClaimRecords(ctx)
	genesis.ClaimEthRecords = k.GetClaimEthRecords(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
