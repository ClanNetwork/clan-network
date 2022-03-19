package keeper

import (
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/gogo/protobuf/proto"
)

// SetClaimables set claimable amount from balances object
func (k Keeper) SetClaimEthRecords(ctx sdk.Context, claimEthRecords []types.ClaimEthRecord) error {
	for _, claimEthRecord := range claimEthRecords {
		err := k.SetClaimEthRecord(ctx, claimEthRecord)
		if err != nil {
			return err
		}
	}
	return nil
}

// SetClaimEthRecord set claimEthRecord in the store
func (k Keeper) SetClaimEthRecord(ctx sdk.Context, claimEthRecord types.ClaimEthRecord) error {

	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ClaimEthRecordKey))

	bz, err := proto.Marshal(&claimEthRecord)
	if err != nil {
		return err
	}

	addr, err := hexutil.Decode(claimEthRecord.Address)
	if err != nil {
		return err
	}

	prefixStore.Set(addr, bz)
	return nil
}

// GetClaimEthRecord returns claimEthRecord
func (k Keeper) GetClaimEthRecord(ctx sdk.Context, addr []byte) (types.ClaimEthRecord, error) {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ClaimEthRecordKey))
	if !prefixStore.Has(addr) {
		return types.ClaimEthRecord{}, nil
	}
	bz := prefixStore.Get(addr)

	claimEthRecord := types.ClaimEthRecord{}
	err := proto.Unmarshal(bz, &claimEthRecord)
	if err != nil {
		return types.ClaimEthRecord{}, err
	}

	return claimEthRecord, nil
}

// GetClaimEthRecords get claimables eth for genesis export
func (k Keeper) GetClaimEthRecords(ctx sdk.Context) []types.ClaimEthRecord {
	store := ctx.KVStore(k.storeKey)
	prefixStore := prefix.NewStore(store, types.KeyPrefix(types.ClaimEthRecordKey))

	iterator := prefixStore.Iterator(nil, nil)
	defer iterator.Close()

	claimEthRecords := []types.ClaimEthRecord{}
	for ; iterator.Valid(); iterator.Next() {

		claimEthRecord := types.ClaimEthRecord{}

		err := proto.Unmarshal(iterator.Value(), &claimEthRecord)
		if err != nil {
			panic(err)
		}

		claimEthRecords = append(claimEthRecords, claimEthRecord)
	}
	return claimEthRecords
}
