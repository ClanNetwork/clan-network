package simulation

import (
	"math/rand"

	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgClaimFroEthAddress(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		msg := &types.MsgClaimFroEthAddress{}

		// TODO: Handling the ClaimFroEthAddress simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "ClaimFroEthAddress simulation not implemented"), nil, nil
	}
}
