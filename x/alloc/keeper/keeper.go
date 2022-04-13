package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/ClanNetwork/clan-network/x/alloc/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

type (
	Keeper struct {
		cdc      codec.BinaryCodec
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey

		accountKeeper types.AccountKeeper
		bankKeeper    types.BankKeeper
		stakingKeeper types.StakingKeeper
		distrKeeper   types.DistrKeeper

		paramstore paramtypes.Subspace
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,

	accountKeeper types.AccountKeeper, bankKeeper types.BankKeeper, stakingKeeper types.StakingKeeper, distrKeeper types.DistrKeeper,
	ps paramtypes.Subspace,
) *Keeper {

	// set KeyTable if it has not already been set
	if !ps.HasKeyTable() {
		ps = ps.WithKeyTable(types.ParamKeyTable())
	}

	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,

		accountKeeper: accountKeeper, bankKeeper: bankKeeper, stakingKeeper: stakingKeeper, distrKeeper: distrKeeper,
		paramstore: ps,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetModuleAccountBalance gets the airdrop coin balance of module account
func (k Keeper) GetModuleAccountAddress(ctx sdk.Context) sdk.AccAddress {
	return k.accountKeeper.GetModuleAddress(types.ModuleName)
}

// DistributeInflation distributes module-specific inflation
func (k Keeper) DistributeInflation(ctx sdk.Context) error {
	blockInflationAddr := k.accountKeeper.GetModuleAccount(ctx, authtypes.FeeCollectorName).GetAddress()
	blockInflation := k.bankKeeper.GetBalance(ctx, blockInflationAddr, k.stakingKeeper.BondDenom(ctx))
	blockInflationDec := sdk.NewDecFromInt(blockInflation.Amount)

	params := k.GetParams(ctx)
	proportions := params.DistributionProportions

	err := k.FundWeightedAddress(ctx, proportions.CoreDev, blockInflationDec, blockInflationAddr)
	if err != nil {
		return err
	}
	err = k.FundWeightedAddress(ctx, proportions.Dao, blockInflationDec, blockInflationAddr)
	if err != nil {
		return err
	}

	return nil
}

func (k Keeper) FundWeightedAddress(ctx sdk.Context, weightedAddr types.WeightedAddress, inflation sdk.Dec, inflationAddr sdk.AccAddress) error {
	amountToFund := inflation.Mul(weightedAddr.Weight)
	amountToFundCoin := sdk.NewCoin(k.stakingKeeper.BondDenom(ctx), amountToFund.TruncateInt())

	coreDevAddr, err := sdk.AccAddressFromBech32(weightedAddr.Address)
	if err != nil {
		return err
	}
	err = k.bankKeeper.SendCoins(ctx, inflationAddr, coreDevAddr, sdk.NewCoins(amountToFundCoin))
	if err != nil {
		return err
	}
	k.Logger(ctx).Debug("sent coins to Core Dev pool", "amount", amountToFundCoin.String(), "from", inflationAddr)

	return nil
}

// GetProportions gets the balance of the `MintedDenom` from minted coins
// and returns coins according to the `AllocationRatio`
func (k Keeper) GetProportions(ctx sdk.Context, mintedCoin sdk.Coin, ratio sdk.Dec) sdk.Coin {
	return sdk.NewCoin(mintedCoin.Denom, mintedCoin.Amount.ToDec().Mul(ratio).TruncateInt())
}

func (k Keeper) FundCommunityPool(ctx sdk.Context) error {
	// If this account exists and has coins, fund the community pool
	funder, err := sdk.AccAddressFromHex("8CEF4A78C2225BBD62040BCD0FF0B12FFD48C1BF") // stars13nh557xzyfdm6csyp0xslu939l753sdlgdc2q0
	if err != nil {
		panic(err)
	}
	balances := k.bankKeeper.GetAllBalances(ctx, funder)
	if balances.IsZero() {
		return nil
	}
	return k.distrKeeper.FundCommunityPool(ctx, balances, funder)
}
