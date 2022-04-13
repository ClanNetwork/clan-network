package keeper_test

import (
	"encoding/json"
	"github.com/cosmos/cosmos-sdk/baseapp"

	"github.com/tendermint/starport/starport/pkg/cosmoscmd"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	clanapp "github.com/ClanNetwork/clan-network/app"
	"github.com/ClanNetwork/clan-network/x/mint/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	dbm "github.com/tendermint/tm-db"
)

// returns context and an app with updated mint keeper
func createTestApp(isCheckTx bool) (*clanapp.App, sdk.Context) {
	app := setup(isCheckTx)

	ctx := app.BaseApp.NewContext(isCheckTx, tmproto.Header{})
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
