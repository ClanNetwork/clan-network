package keeper_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/ClanNetwork/clan-network/app"
	"github.com/ClanNetwork/clan-network/testutil/simapp"
	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/ethereum/go-ethereum/common/hexutil"

	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type KeeperTestSuite struct {
	suite.Suite
	ctx     sdk.Context
	app     *app.App
	msgSrvr types.MsgServer
}

func (suite *KeeperTestSuite) SetupTest() {
	suite.app = simapp.New(suite.T().TempDir())
	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{Height: 2, ChainID: "clannetwork-1", Time: time.Now().UTC()})
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

func (s *KeeperTestSuite) TestModuleAccountCreated() {
	app, ctx := s.app, s.ctx
	moduleAddress := app.AccountKeeper.GetModuleAddress(types.ModuleName)
	balance := app.BankKeeper.GetBalance(ctx, moduleAddress, types.DefaultClaimDenom)
	s.Require().Equal(fmt.Sprintf("10000000%s", types.DefaultClaimDenom), balance.String())

}

func (s *KeeperTestSuite) TestClaimFormEthAddress() {
	//cosmoscmd.SetPrefixes(app.AccountAddressPrefix)

	addrStr := "cosmos18ah3pcc76cuyapz0tdakjegupsjzyftmdqsjnp"
	addrEthStr := "0xfc0962770A2A1d142f7b48cb40d04001c73Af840"
	sigStr := "0x810fa190b31024558a35a04f21ce4882aa117604e9aad3694a010eef955a47ab36db250e64ad29d3fbf61d456d0f641b13b74838e5488a698967ca185b99a1b81b"
	wrongSigStr := "0x967dc96c596b1d580b2d295f6bb0924675e3cccf0aa168346035d783fb80731d1faa7984efefb90923eb4c831db4a695803bf0da6613680052a3fab5d02089ec1c"
	addr, _ := sdk.AccAddressFromBech32(addrStr)
	claimEthRecords := []types.ClaimEthRecord{
		{
			Address:                addrEthStr,
			InitialClaimableAmount: sdk.NewCoins(sdk.NewInt64Coin(types.DefaultClaimDenom, 2000)),
			Completed:              false,
		},
	}

	s.app.AccountKeeper.SetAccount(s.ctx, authtypes.NewBaseAccount(addr, nil, 0, 0))

	// disable airdrop
	s.app.ClaimKeeper.SetParams(s.ctx, types.Params{
		AirdropEnabled:     false,
		AirdropStartTime:   time.Now().Add(time.Hour * -1),
		ClaimDenom:         types.DefaultClaimDenom,
		DurationUntilDecay: time.Hour,
		DurationOfDecay:    time.Hour * 4,
	})
	err := s.app.ClaimKeeper.SetClaimEthRecords(s.ctx, claimEthRecords)
	s.Require().NoError(err)

	// test airdrop disabled
	msgClaimFroEthAddress := types.NewMsgClaimFroEthAddress(addr.String(), addrStr, sigStr)
	ctx := sdk.WrapSDKContext(s.ctx)
	_, err = s.msgSrvr.ClaimFroEthAddress(ctx, msgClaimFroEthAddress)
	s.Error(err)
	s.Contains(err.Error(), "airdrop not enabled")

	// enable airdrop
	s.app.ClaimKeeper.SetParams(s.ctx, types.Params{
		AirdropEnabled:     true,
		AirdropStartTime:   time.Now().Add(time.Hour * -1),
		ClaimDenom:         types.DefaultClaimDenom,
		DurationUntilDecay: time.Hour,
		DurationOfDecay:    time.Hour * 4,
	})

	// test wrong claim sig
	msgClaimFroEthAddress = types.NewMsgClaimFroEthAddress(addr.String(), addrStr, wrongSigStr)
	_, err = s.msgSrvr.ClaimFroEthAddress(ctx, msgClaimFroEthAddress)
	s.Contains(err.Error(), "address is not allowed to claim")

	// test claim
	msgClaimFroEthAddress = types.NewMsgClaimFroEthAddress(addr.String(), addrStr, sigStr)
	_, err = s.msgSrvr.ClaimFroEthAddress(ctx, msgClaimFroEthAddress)
	s.Require().NoError(err)

	claimedCoins := s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimEthRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom))

	addrBytes1, _ := hexutil.Decode(claimEthRecords[0].Address)
	record, err := s.app.ClaimKeeper.GetClaimEthRecord(s.ctx, addrBytes1)
	s.Require().NoError(err)
	s.Require().True(record.Completed)

	// test re-claim
	msgClaimFroEthAddress = types.NewMsgClaimFroEthAddress(addr.String(), addrStr, sigStr)
	_, err = s.msgSrvr.ClaimFroEthAddress(ctx, msgClaimFroEthAddress)
	s.Require().NoError(err)

	claimedCoins = s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimEthRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom))

}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func FundAccount(bankKeeper bankkeeper.Keeper, ctx sdk.Context, addr sdk.AccAddress, amounts sdk.Coins) error {
	if err := bankKeeper.MintCoins(ctx, minttypes.ModuleName, amounts); err != nil {
		return err
	}
	return bankKeeper.SendCoinsFromModuleToAccount(ctx, minttypes.ModuleName, addr, amounts)
}
