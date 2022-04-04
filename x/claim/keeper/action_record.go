package keeper

import (
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gogo/protobuf/proto"
)

// SetActionables set claimable amount from balances object
func (k Keeper) SetActionRecords(ctx sdk.Context, claimRecords []types.ActionRecord) error {
	for _, claimRecord := range claimRecords {
		err := k.SetActionRecord(ctx, claimRecord)
		if err != nil {
			return err
		}
	}
	return nil
}

// SetActionables set claimable amount from balances object
func (k Keeper) SetActionRecord(ctx sdk.Context, claimRecord types.ActionRecord) error {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ActionRecordKey))

	bz, err := proto.Marshal(&claimRecord)
	if err != nil {
		return err
	}

	addr, err := sdk.AccAddressFromBech32(claimRecord.Address)
	if err != nil {
		return err
	}

	prefixStore.Set(addr, bz)
	return nil
}

// GetActionRecord returns the claim record for a specific address
func (k Keeper) GetActionRecord(ctx sdk.Context, addr sdk.AccAddress) (types.ActionRecord, error) {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ActionRecordKey))
	if !prefixStore.Has(addr) {
		return types.ActionRecord{}, nil
	}
	bz := prefixStore.Get(addr)

	claimRecord := types.ActionRecord{}
	err := proto.Unmarshal(bz, &claimRecord)
	if err != nil {
		return types.ActionRecord{}, err
	}

	return claimRecord, nil
}

// GetActionRecords get claimables for genesis export
func (k Keeper) GetActionRecords(ctx sdk.Context) []types.ActionRecord {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ActionRecordKey))

	iterator := prefixStore.Iterator(nil, nil)
	defer iterator.Close()

	claimRecords := []types.ActionRecord{}
	for ; iterator.Valid(); iterator.Next() {

		claimRecord := types.ActionRecord{}

		err := proto.Unmarshal(iterator.Value(), &claimRecord)
		if err != nil {
			panic(err)
		}

		claimRecords = append(claimRecords, claimRecord)
	}
	return claimRecords
}
