package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/claim module sentinel errors
var (
	ErrAirdropNotEnabled             = sdkerrors.Register(ModuleName, 2101, "airdrop not enabled")
	ErrIncorrectModuleAccountBalance = sdkerrors.Register(ModuleName, 2102, "claim module account balance != sum of all claim record InitialClaimableAmounts")
	ErrUnauthorizedClaimer           = sdkerrors.Register(ModuleName, 2103, "address is not allowed to claim")
	ErrInvalidClaimAddress           = sdkerrors.Register(ModuleName, 2104, "address for claim is invalid")
	ErrInvalidInitialClaimRequest    = sdkerrors.Register(ModuleName, 2105, "missing parameters for initial claims")
)
