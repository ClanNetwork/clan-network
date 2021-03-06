package keeper

import (
	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
)

// CreateModuleAccount creates module account of airdrop module
func (k Keeper) CreateModuleAccount(ctx sdk.Context, amount sdk.Coin) {
	moduleAcc := authtypes.NewEmptyModuleAccount(types.ModuleName, authtypes.Minter)
	k.accountKeeper.SetModuleAccount(ctx, moduleAcc)
	err := k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(amount))
	if err != nil {
		panic(err)
	}
}

// GetClaimable returns claimable amount for a specific action done by an address
func (k Keeper) GetClaimableAmountForAction(ctx sdk.Context, addr sdk.AccAddress, action types.Action) (sdk.Coins, error) {
	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return nil, err
	}

	if claimRecord.ClanAddress == "" {
		return sdk.Coins{}, nil
	}

	// if action already completed, nothing is claimable
	if claimRecord.ActionClaimed[action] {
		return sdk.Coins{}, nil
	}

	params := k.GetParams(ctx)

	// If we are before the start time, do nothing.
	// This case _shouldn't_ occur on chain, since the
	// start time ought to be chain start time.
	if ctx.BlockTime().Before(params.AirdropStartTime) {
		return sdk.Coins{}, nil
	}

	InitialClaimablePerAction := sdk.Coins{}
	for _, coin := range claimRecord.InitialClaimableAmount {
		InitialClaimablePerAction = InitialClaimablePerAction.Add(
			sdk.NewCoin(coin.Denom,
				coin.Amount.QuoRaw(int64(len(types.Action_name))),
			),
		)
	}

	elapsedAirdropTime := ctx.BlockTime().Sub(params.AirdropStartTime)
	// Are we early enough in the airdrop s.t. theres no decay?
	if elapsedAirdropTime <= params.DurationUntilDecay {
		return InitialClaimablePerAction, nil
	}

	// The entire airdrop has completed
	if elapsedAirdropTime > params.DurationUntilDecay+params.DurationOfDecay {
		return sdk.Coins{}, nil
	}

	// Positive, since goneTime > params.DurationUntilDecay
	decayTime := elapsedAirdropTime - params.DurationUntilDecay
	decayPercent := sdk.NewDec(decayTime.Nanoseconds()).QuoInt64(params.DurationOfDecay.Nanoseconds())
	claimablePercent := sdk.OneDec().Sub(decayPercent)

	claimableCoins := sdk.Coins{}
	for _, coin := range InitialClaimablePerAction {
		claimableCoins = claimableCoins.Add(sdk.NewCoin(coin.Denom, coin.Amount.ToDec().Mul(claimablePercent).RoundInt()))
	}

	return claimableCoins, nil
}

// GetClaimable returns claimable amount for a specific action done by an address
func (k Keeper) GetUserTotalClaimable(ctx sdk.Context, addr sdk.AccAddress) (sdk.Coins, error) {
	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return sdk.Coins{}, err
	}
	if claimRecord.ClaimAddress == "" {
		return sdk.Coins{}, nil
	}

	totalClaimable := sdk.Coins{}

	for action := range types.Action_name {
		claimableForAction, err := k.GetClaimableAmountForAction(ctx, addr, types.Action(action))
		if err != nil {
			return sdk.Coins{}, err
		}
		totalClaimable = totalClaimable.Add(claimableForAction...)
	}
	return totalClaimable, nil
}

// SetActionCompleted update addr record that action completed and transfer all exisiting claim records
func (k Keeper) SetActionCompleted(ctx sdk.Context, addr sdk.AccAddress, action types.Action) (sdk.Coins, error) {
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return sdk.Coins{}, nil
	}
	actionRecord, err := k.GetActionRecord(ctx, addr)
	if err != nil {
		return sdk.Coins{}, err
	}

	if len(actionRecord.ActionCompleted) == 0 {
		actionRecord.ActionCompleted = []bool{false, false, false, false, false}
	}

	if actionRecord.ActionCompleted[action] {
		return sdk.Coins{}, nil
	}

	if actionRecord.Address == "" {
		actionRecord.Address = addr.String()
	}

	actionRecord.ActionCompleted[action] = true

	err = k.SetActionRecord(ctx, actionRecord)
	if err != nil {
		return nil, err
	}

	claimableCoins := sdk.Coins{}
	for _, claimAddrStr := range actionRecord.ClaimAddresses {
		claimAddr, _ := sdk.AccAddressFromBech32(claimAddrStr)
		claimRecord, err := k.GetClaimRecord(ctx, claimAddr)
		if err == nil && claimRecord.ClaimAddress != "" {
			clamied, _ := k.ClaimCoinsForAction(ctx, claimAddr, addr, action)
			claimableCoins = claimableCoins.Add(clamied...)
		}
	}

	return claimableCoins, nil
}

// ClaimCoins remove claimable amount entry and transfer it to user's account
func (k Keeper) ClaimCoinsForAction(ctx sdk.Context, addr sdk.AccAddress, clanAddr sdk.AccAddress, action types.Action) (sdk.Coins, error) {
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return sdk.Coins{}, nil
	}
	actionRecord, err := k.GetActionRecord(ctx, clanAddr)
	if err != nil {
		return sdk.Coins{}, err
	}
	if !actionRecord.ActionCompleted[action] {
		return sdk.Coins{}, nil
	}

	claimableAmount, err := k.GetClaimableAmountForAction(ctx, addr, action)
	if err != nil {
		return claimableAmount, err
	}

	if claimableAmount.Empty() {
		return claimableAmount, nil
	}

	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return nil, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, clanAddr, claimableAmount)
	if err != nil {
		return nil, err
	}

	claimRecord.ActionClaimed[action] = true

	err = k.SetClaimRecord(ctx, claimRecord)
	if err != nil {
		return claimableAmount, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventTypeClaim,
			sdk.NewAttribute(sdk.AttributeKeySender, addr.String()),
			sdk.NewAttribute(sdk.AttributeKeyAmount, claimableAmount.String()),
		),
	})

	return claimableAmount, nil
}

// InitClaimCoinsForAllAction remove claimable amount entry and transfer it to user's account for all completed actions
func (k Keeper) InitClaimCoinsForAllAction(ctx sdk.Context, addr sdk.AccAddress, clanAddr sdk.AccAddress) (sdk.Coins, error) {
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return sdk.Coins{}, nil
	}
	claimRecord, err := k.GetClaimRecord(ctx, addr)
	if err != nil {
		return nil, err
	}

	// claim doesn't exsits or already initilized
	if claimRecord.ClaimAddress == "" || claimRecord.ClanAddress != "" {
		return sdk.Coins{}, err
	}

	claimRecord.ClanAddress = clanAddr.String()

	err = k.SetClaimRecord(ctx, claimRecord)
	if err != nil {
		return sdk.Coins{}, err
	}

	actionRecord, err := k.GetActionRecord(ctx, clanAddr)
	if err != nil {
		return sdk.Coins{}, err
	}

	if actionRecord.Address == "" {
		actionRecord.Address = clanAddr.String()
	}

	actionRecord.ClaimAddresses = append(actionRecord.ClaimAddresses, addr.String())

	if len(actionRecord.ActionCompleted) == 0 {
		actionRecord.ActionCompleted = []bool{false, false, false, false, false}
	}

	actionRecord.ActionCompleted[types.ActionInitialClaim] = true

	err = k.SetActionRecord(ctx, actionRecord)
	if err != nil {
		return sdk.Coins{}, err
	}

	claimableCoins := sdk.Coins{}
	for _, action := range types.Action_value {
		if actionRecord.ActionCompleted[action] && !claimRecord.ActionClaimed[action] {
			clamied, _ := k.ClaimCoinsForAction(ctx, addr, clanAddr, types.Action(action))
			claimableCoins = claimableCoins.Add(clamied...)
		}
	}

	if err != nil {
		return claimableCoins, err
	}

	if claimableCoins.Empty() {
		return claimableCoins, nil
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventTypeClaim,
			sdk.NewAttribute(sdk.AttributeKeySender, addr.String()),
			sdk.NewAttribute(sdk.AttributeKeyAmount, claimableCoins.String()),
		),
	})

	return claimableCoins, nil
}

// FundRemainingsToCommunity fund remainings to the community when airdrop period end
func (k Keeper) fundRemainingsToCommunity(ctx sdk.Context) error {
	moduleAccAddr := k.GetModuleAccountAddress(ctx)
	amt := k.GetModuleAccountBalance(ctx)
	return k.distrKeeper.FundCommunityPool(ctx, sdk.NewCoins(amt), moduleAccAddr)
}

func (k Keeper) EndAirdrop(ctx sdk.Context) error {
	err := k.fundRemainingsToCommunity(ctx)
	if err != nil {
		return err
	}
	k.clearInitialClaimables(ctx)
	k.clearActionRecords(ctx)
	k.clearEthInitialClaimables(ctx)
	return nil
}

// ClearClaimables clear claimable amounts
func (k Keeper) clearInitialClaimables(ctx sdk.Context) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.ClaimRecordKey))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		key := iterator.Key()
		store.Delete(key)
	}
}

// ClearClaimables clear claimable amounts
func (k Keeper) clearActionRecords(ctx sdk.Context) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.ActionRecordKey))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		key := iterator.Key()
		store.Delete(key)
	}
}

// ClearEthInitialClaimables clear claimable amounts for Eth accounts
func (k Keeper) clearEthInitialClaimables(ctx sdk.Context) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefix(types.ClaimEthRecordKey))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		key := iterator.Key()
		store.Delete(key)
	}
}

// GetClaimableAmountForEthAddress returns claimable amount for an eth address
func (k Keeper) GetClaimableAmountForEthAddress(ctx sdk.Context, addr []byte) (sdk.Coins, error) {
	claimEthRecord, err := k.GetClaimEthRecord(ctx, addr)
	if err != nil {
		return sdk.Coins{}, err
	}

	if claimEthRecord.Address == "" {
		return sdk.Coins{}, types.ErrUnauthorizedClaimer
	}

	// if action already completed, nothing is claimable
	if claimEthRecord.Completed {
		return sdk.Coins{}, nil
	}

	params := k.GetParams(ctx)

	// If we are before the start time, do nothing.
	// This case _shouldn't_ occur on chain, since the
	// start time ought to be chain start time.
	if ctx.BlockTime().Before(params.AirdropStartTime) {
		return sdk.Coins{}, nil
	}

	elapsedAirdropTime := ctx.BlockTime().Sub(params.AirdropStartTime)
	// Are we early enough in the airdrop s.t. theres no decay?
	if elapsedAirdropTime <= params.DurationUntilDecay {
		return claimEthRecord.InitialClaimableAmount, nil
	}

	// The entire airdrop has completed
	if elapsedAirdropTime > params.DurationUntilDecay+params.DurationOfDecay {
		return sdk.Coins{}, nil
	}

	// Positive, since goneTime > params.DurationUntilDecay
	decayTime := elapsedAirdropTime - params.DurationUntilDecay
	decayPercent := sdk.NewDec(decayTime.Nanoseconds()).QuoInt64(params.DurationOfDecay.Nanoseconds())
	claimablePercent := sdk.OneDec().Sub(decayPercent)

	claimableCoins := sdk.Coins{}
	for _, coin := range claimEthRecord.InitialClaimableAmount {
		claimableCoins = claimableCoins.Add(sdk.NewCoin(coin.Denom, coin.Amount.ToDec().Mul(claimablePercent).RoundInt()))
	}
	return claimableCoins, nil
}

// ClaimCoins remove claimable amount entry and transfer it to user's account
func (k Keeper) ClaimCoinsForEthAddress(ctx sdk.Context, addrEth []byte, addr sdk.AccAddress) (sdk.Coins, error) {
	params := k.GetParams(ctx)
	if !params.IsAirdropEnabled(ctx.BlockTime()) {
		return sdk.Coins{}, nil
	}
	claimableAmount, err := k.GetClaimableAmountForEthAddress(ctx, addrEth)
	if err != nil {
		return claimableAmount, err
	}

	claimEthRecord, err := k.GetClaimEthRecord(ctx, addrEth)
	if err != nil {
		return sdk.Coins{}, err
	}

	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, addr, claimableAmount)
	if err != nil {
		return sdk.Coins{}, err
	}

	claimEthRecord.Completed = true

	err = k.SetClaimEthRecord(ctx, claimEthRecord)
	if err != nil {
		return claimableAmount, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventTypeClaim,
			sdk.NewAttribute(types.AdreessEventType, addr.String()),
			sdk.NewAttribute(types.EthAdreessEventType, hexutil.Encode(addrEth)),
			sdk.NewAttribute(sdk.AttributeKeyAmount, claimableAmount.String()),
		),
	})

	return claimableAmount, nil
}
