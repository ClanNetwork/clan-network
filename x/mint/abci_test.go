package mint_test

import (
	clanapp "github.com/ClanNetwork/clan-network/app"
	"github.com/ClanNetwork/clan-network/x/mint"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abcitypes "github.com/tendermint/tendermint/abci/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	dbm "github.com/tendermint/tm-db"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"encoding/json"

	"github.com/tendermint/starport/starport/pkg/cosmoscmd"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/ClanNetwork/clan-network/x/mint/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	abci "github.com/tendermint/tendermint/abci/types"
)

func TestEmissionYearOne(t *testing.T) {
	app, ctx := createTestApp(true, time.Now().AddDate(0, 0, 1))

	app.InitChain(
		abcitypes.RequestInitChain{
			AppStateBytes: []byte("{}"),
			ChainId:       "test-chain-id",
		},
	)

	params := app.MintKeeper.GetParams(ctx)
	perBlockYearOne := params.InitialAnnualProvisions.QuoInt(sdk.NewIntFromUint64(params.BlocksPerYear)).TruncateInt()

	supplyBefore := app.BankKeeper.GetSupply(ctx, "uclan")
	mint.BeginBlocker(ctx, app.MintKeeper)
	supplyAfter := app.BankKeeper.GetSupply(ctx, "uclan")

	require.Equal(t, supplyAfter.Sub(supplyBefore), sdk.NewCoin("uclan", perBlockYearOne))
}

func TestEmissionYearTwo(t *testing.T) {
	app, ctx := createTestApp(true, time.Now().AddDate(1, 0, 1))

	app.InitChain(
		abcitypes.RequestInitChain{
			AppStateBytes: []byte("{}"),
			ChainId:       "test-chain-id",
		},
	)

	params := app.MintKeeper.GetParams(ctx)
	perBlockYearTwo := params.InitialAnnualProvisions.Mul(params.ReductionFactor).QuoInt(sdk.NewIntFromUint64(params.BlocksPerYear)).TruncateInt()

	supplyBefore := app.BankKeeper.GetSupply(ctx, "uclan")
	mint.BeginBlocker(ctx, app.MintKeeper)
	supplyAfter := app.BankKeeper.GetSupply(ctx, "uclan")

	require.Equal(t, supplyAfter.Sub(supplyBefore), sdk.NewCoin("uclan", perBlockYearTwo))
}

// returns context and an app with updated mint keeper
func createTestApp(isCheckTx bool, blockTime time.Time) (*clanapp.App, sdk.Context) {
	app := setup(isCheckTx)

	ctx := app.BaseApp.NewContext(isCheckTx, tmproto.Header{
		Time: blockTime,
	})
	app.MintKeeper.SetParams(ctx, types.DefaultParams())
	app.MintKeeper.SetMinter(ctx, types.DefaultInitialMinter())

	return app, ctx
}

func setup(isCheckTx bool) *clanapp.App {
	app, genesisState := genApp(!isCheckTx, 5)
	if !isCheckTx {
		// init chain must be called to stop deliverState from being nil
		stateBytes, err := json.MarshalIndent(genesisState, "", " ")
		if err != nil {
			panic(err)
		}

		// Initialize the chain
		app.InitChain(
			abci.RequestInitChain{
				Validators:      []abci.ValidatorUpdate{},
				ConsensusParams: simapp.DefaultConsensusParams,
				AppStateBytes:   stateBytes,
			},
		)
	}

	return app
}

func genApp(withGenesis bool, invCheckPeriod uint) (*clanapp.App, clanapp.GenesisState) {
	db := dbm.NewMemDB()
	encCdc := cosmoscmd.MakeEncodingConfig(clanapp.ModuleBasics)
	app := clanapp.New(
		log.NewNopLogger(),
		db,
		nil,
		true,
		map[int64]bool{},
		simapp.DefaultNodeHome,
		invCheckPeriod,
		encCdc,
		simapp.EmptyAppOptions{},
		func(*baseapp.BaseApp) {},
	)

	originalApp := app.(*clanapp.App)

	if withGenesis {
		return originalApp, clanapp.NewDefaultGenesisState(encCdc.Marshaler)
	}

	return originalApp, clanapp.GenesisState{}
}
