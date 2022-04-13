package alloc

import (
	"fmt"
	"time"

	"github.com/ClanNetwork/clan-network/x/alloc/keeper"
	"github.com/ClanNetwork/clan-network/x/alloc/types"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// BeginBlocker to distribute specific rewards on every begin block
func BeginBlocker(ctx sdk.Context, k keeper.Keeper) {
	defer telemetry.ModuleMeasureSince(types.ModuleName, time.Now(), telemetry.MetricKeyBeginBlocker)
	if err := k.DistributeInflation(ctx); err != nil {
		panic(fmt.Sprintf("Error distribute inflation: %s", err.Error()))
	}
}
