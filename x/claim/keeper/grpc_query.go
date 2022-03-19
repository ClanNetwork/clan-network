package keeper

import (
	"github.com/ClanNetwork/clan-network/x/claim/types"
)

var _ types.QueryServer = Keeper{}
