package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgClaimFroEthAddress = "claim_from_eth_address"

var _ sdk.Msg = &MsgClaimFroEthAddress{}

func NewMsgClaimFroEthAddress(creator string, message string, signature string) *MsgClaimFroEthAddress {
	return &MsgClaimFroEthAddress{
		Creator:   creator,
		Message:   message,
		Signature: signature,
	}
}

func (msg *MsgClaimFroEthAddress) Route() string {
	return RouterKey
}

func (msg *MsgClaimFroEthAddress) Type() string {
	return TypeMsgClaimFroEthAddress
}

func (msg *MsgClaimFroEthAddress) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgClaimFroEthAddress) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgClaimFroEthAddress) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
