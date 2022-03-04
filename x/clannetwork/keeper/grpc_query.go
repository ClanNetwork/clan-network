package keeper

import (
	"github.com/ClanNetwork/clan-network/x/clannetwork/types"
)

var _ types.QueryServer = Keeper{}
