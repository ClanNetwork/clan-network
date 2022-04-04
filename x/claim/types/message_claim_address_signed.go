package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/legacy/legacytx"
)

const TypeMsgClaimAddressSigned = "claim_clan_airdrop"

var (
	_ sdk.Msg            = &MsgClaimAddressSigned{}
	_ legacytx.LegacyMsg = &MsgClaimAddressSigned{} // For amino support.
)

func NewMsgClaimAddressSigned(typ string, value string, signature string) *MsgClaimAddressSigned {
	return &MsgClaimAddressSigned{
		Value: value,
	}
}

func (msg *MsgClaimAddressSigned) Route() string {
	return RouterKey
}

func (msg *MsgClaimAddressSigned) Type() string {
	return TypeMsgClaimAddressSigned
}

func (msg *MsgClaimAddressSigned) GetSigners() []sdk.AccAddress {

	return []sdk.AccAddress{nil}
}

func (msg *MsgClaimAddressSigned) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgClaimAddressSigned) ValidateBasic() error {
	return nil
}
