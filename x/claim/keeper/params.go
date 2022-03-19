package keeper

import (
	"time"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// GetParams get all parameters as types.Params
func (k Keeper) GetParams(ctx sdk.Context) types.Params {
	return types.NewParams(
		k.AirdropEnabled(ctx),
		k.ClaimDenom(ctx),
		k.AirdropStartTime(ctx),
		k.DurationUntilDecay(ctx),
		k.DurationOfDecay(ctx),
	)
}

// SetParams set the params
func (k Keeper) SetParams(ctx sdk.Context, params types.Params) {
	k.paramstore.SetParamSet(ctx, &params)
}

// AirdropEnabled returns the AirdropEnabled param
func (k Keeper) AirdropEnabled(ctx sdk.Context) (res bool) {
	k.paramstore.Get(ctx, types.KeyAirdropEnabled, &res)
	return
}

// AirdropStartTime returns the AirdropStartTime param
func (k Keeper) AirdropStartTime(ctx sdk.Context) (res time.Time) {
	k.paramstore.Get(ctx, types.KeyAirdropStartTime, &res)
	return
}

// DurationUntilDecay returns the DurationUntilDecay param
func (k Keeper) DurationUntilDecay(ctx sdk.Context) (res time.Duration) {
	k.paramstore.Get(ctx, types.KeyDurationUntilDecay, &res)
	return
}

// DurationOfDecay returns the DurationOfDecay param
func (k Keeper) DurationOfDecay(ctx sdk.Context) (res time.Duration) {
	k.paramstore.Get(ctx, types.KeyDurationOfDecay, &res)
	return
}

// ClaimDenom returns the ClaimDenom param
func (k Keeper) ClaimDenom(ctx sdk.Context) (res string) {
	k.paramstore.Get(ctx, types.KeyClaimDenom, &res)
	return
}
