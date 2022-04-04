package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgClaimForEthAddress = "claim_from_eth_address"

var _ sdk.Msg = &MsgClaimForEthAddress{}

func NewMsgClaimForEthAddress(creator string, message string, signature string) *MsgClaimForEthAddress {
	return &MsgClaimForEthAddress{
		Creator:   creator,
		Message:   message,
		Signature: signature,
	}
}

func (msg *MsgClaimForEthAddress) Route() string {
	return RouterKey
}

func (msg *MsgClaimForEthAddress) Type() string {
	return TypeMsgClaimForEthAddress
}

func (msg *MsgClaimForEthAddress) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgClaimForEthAddress) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgClaimForEthAddress) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
