package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// this line is used by starport scaffolding # genesis/types/import

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		ModuleAccountBalance: sdk.NewCoin(DefaultClaimDenom, sdk.NewInt(0)),
		Params:               DefaultParams(),
		ClaimRecords:         make([]ClaimRecord, 0),
		ClaimEthRecords:      make([]ClaimEthRecord, 0),
		// this line is used by starport scaffolding # genesis/types/default
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// this line is used by starport scaffolding # genesis/types/validate

	totalClaimable := sdk.Coins{}
	for _, claimRecord := range gs.ClaimRecords {
		totalClaimable = totalClaimable.Add(claimRecord.InitialClaimableAmount...)
	}
	for _, claimEthRecord := range gs.ClaimEthRecords {
		totalClaimable = totalClaimable.Add(claimEthRecord.InitialClaimableAmount...)
	}

	if !totalClaimable.IsEqual(sdk.NewCoins(gs.ModuleAccountBalance)) {
		return ErrIncorrectModuleAccountBalance
	}
	return nil
}
