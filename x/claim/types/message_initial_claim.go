package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgInitialClaim = "initial_claim"

var _ sdk.Msg = &MsgInitialClaim{}

func NewMsgInitialClaim(creator string) *MsgInitialClaim {
	return &MsgInitialClaim{
		Creator: creator,
	}
}

func (msg *MsgInitialClaim) Route() string {
	return RouterKey
}

func (msg *MsgInitialClaim) Type() string {
	return TypeMsgInitialClaim
}

func (msg *MsgInitialClaim) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgInitialClaim) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgInitialClaim) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
