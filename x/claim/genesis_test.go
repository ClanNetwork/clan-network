package claim_test

import (
	"testing"
	"time"

	"github.com/ClanNetwork/clan-network/app"
	"github.com/ClanNetwork/clan-network/testutil/simapp"
	"github.com/ClanNetwork/clan-network/x/claim"
	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type ClaimTestSuite struct {
	suite.Suite
	ctx     sdk.Context
	app     *app.App
	msgSrvr types.MsgServer
}

func (suite *ClaimTestSuite) SetupTest() {
	suite.app = simapp.New(suite.T().TempDir())
	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{Height: 2, ChainID: "clan-1", Time: time.Now().UTC()})
	suite.app.ClaimKeeper.CreateModuleAccount(suite.ctx, sdk.NewCoin(types.DefaultClaimDenom, sdk.NewInt(10000000)))
	startTime := time.Now()

	suite.msgSrvr = keeper.NewMsgServerImpl(suite.app.ClaimKeeper)
	suite.app.ClaimKeeper.SetParams(suite.ctx, types.Params{
		AirdropEnabled:     true,
		AirdropStartTime:   startTime,
		DurationUntilDecay: types.DefaultDurationUntilDecay,
		DurationOfDecay:    types.DefaultDurationOfDecay,
		ClaimDenom:         types.DefaultClaimDenom,
	})
	suite.ctx = suite.ctx.WithBlockTime(startTime)
}

func (s *ClaimTestSuite) TestExportGenesis() {
	app, ctx := s.app, s.ctx
	claim.InitGenesis(ctx, app.ClaimKeeper, *types.DefaultGenesis())
	// app.ClaimKeeper.SetParams(ctx, types.DefaultParams())
	exported := claim.ExportGenesis(ctx, app.ClaimKeeper)
	params := types.DefaultParams()
	params.AirdropStartTime = ctx.BlockTime()
	s.Require().Equal(params.ClaimDenom, exported.Params.ClaimDenom)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(ClaimTestSuite))
}
