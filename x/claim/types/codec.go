package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgInitialClaim{}, "claim/InitialClaim", nil)
	cdc.RegisterConcrete(&MsgClaimForEthAddress{}, "claim/ClaimForEthAddress", nil)
	cdc.RegisterConcrete(&MsgClaimAddressSigned{}, "claim/ClaimAddressSigned", nil)

	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgInitialClaim{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgClaimForEthAddress{},
	)

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgClaimAddressSigned{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
