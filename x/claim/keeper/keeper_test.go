package keeper_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/ClanNetwork/clan-network/app"
	"github.com/ClanNetwork/clan-network/testutil/simapp"
	"github.com/ClanNetwork/clan-network/x/claim/keeper"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
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
	msgClaimForEthAddress := types.NewMsgClaimForEthAddress(addr.String(), addrStr, sigStr)
	ctx := sdk.WrapSDKContext(s.ctx)
	_, err = s.msgSrvr.ClaimForEthAddress(ctx, msgClaimForEthAddress)
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
	msgClaimForEthAddress = types.NewMsgClaimForEthAddress(addr.String(), addrStr, wrongSigStr)
	_, err = s.msgSrvr.ClaimForEthAddress(ctx, msgClaimForEthAddress)
	s.Contains(err.Error(), "address is not allowed to claim")

	// test claim
	msgClaimForEthAddress = types.NewMsgClaimForEthAddress(addr.String(), addrStr, sigStr)
	_, err = s.msgSrvr.ClaimForEthAddress(ctx, msgClaimForEthAddress)
	s.Require().NoError(err)

	claimedCoins := s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimEthRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom))

	addrBytes1, _ := hexutil.Decode(claimEthRecords[0].Address)
	record, err := s.app.ClaimKeeper.GetClaimEthRecord(s.ctx, addrBytes1)
	s.Require().NoError(err)
	s.Require().True(record.Completed)

	// test re-claim
	msgClaimForEthAddress = types.NewMsgClaimForEthAddress(addr.String(), addrStr, sigStr)
	_, err = s.msgSrvr.ClaimForEthAddress(ctx, msgClaimForEthAddress)
	s.Require().NoError(err)

	claimedCoins = s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimEthRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom))

}

func (s *KeeperTestSuite) TestInitialClaim() {
	addrStr := "cosmos18ah3pcc76cuyapz0tdakjegupsjzyftmdqsjnp"
	addrSecretStr := "secret1k7w3lrraasg7t6uw9ujcqn9qvm38r3kusjsnn3"
	addrTerraStr := "terra1fsmetsrgtqadyydgefvem30vhr4jmszynfpvaq"
	// sigSecretStr := "0x2e77f80260a15bca808f8e20067667c64bd2f04a2dd30f04896046db2f166730192b7601393456ba77b7bbaf0e53b552fe47734ee53f8a022e71bfcd5b80b5b0"
	// sigTerraStr := "0x3ee13ff02d34c0ba7e4b6b49ed1a71fd7eabf6d8c8321709a0053a307cf3d79e12c43bbb5ea630497a553adaa989c71cdeaf3413a3edc8a4a27679352686cfa7"
	// pubkeySecretStr := "0x03657b0f6838be320a6cf36e759bafed8362a40e4f2ecfe72f0de5ab393d85951d"
	// pubkeyTerraStr := "0x025739cb95c829fa3b783cb732fceccef6c612b767b7316251486c1f048513fb4a"

	// wrongSigStr := "0x967dc96c596b1d580b2d295f6bb0924675e3cccf0aa168346035d783fb80731d1faa7984efefb90923eb4c831db4a695803bf0da6613680052a3fab5d02089ec1c"

	secretTxSigned := `{
        "chain_id": "secret-4",
        "account_number": "0",
        "sequence": "0",
        "fee": {
            "gas": "1",
            "amount": [
                {
                    "denom": "uscrt",
                    "amount": "0"
                }
            ]
        },
        "msgs": [
            {
                "value": "cosmos18ah3pcc76cuyapz0tdakjegupsjzyftmdqsjnp"
            }
        ],
        "memo": ""
    }`
	secretTxSig := `{
        "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A2V7D2g4vjIKbPNudZuv7YNipA5PLs/nLw3lqzk9hZUd"
        },
        "signature": "XmEVn8aGdZUZRDb/ooXQTJNhfEqmNtKMROBapP2CFM9Ws9z8kHb73HEqOD9E6n/rIYwh8ggLB+dZ/Np5kwzBzg=="
    }`
	secretTxSigWrong := `{
		"pub_key": {
			"type": "tendermint/PubKeySecp256k1",
			"value": "A2V7D2g4vjIKbPNudZuv7YNipA5PLs/nLw3lqzk9hZUd"
		},
		"signature": "O+4bLdjGeR5P3a8H0Y6Q/w4N5rxnhszt793b4WPaOwJjWyM/za33WefFeVU4R/NjmIUEkeXl47FI4TgubtfhdA=="
	}`

	terraTxSigned := `{
        "chain_id": "columbus-5",
        "account_number": "0",
        "sequence": "0",
        "fee": {
            "gas": "1",
            "amount": [
                {
                    "denom": "uluna",
                    "amount": "0"
                }
            ]
        },
        "msgs": [
            {
                "value": "cosmos18ah3pcc76cuyapz0tdakjegupsjzyftmdqsjnp"
            }
        ],
        "memo": ""
    }`
	terraTxSig := `{
        "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "Alc5y5XIKfo7eDy3MvzszvbGErdntzFiUUhsHwSFE/tK"
        },
        "signature": "LbcrGHgu/Q+ZSAe//Q4030JZBZemluY4h5MV8akktV0PBJHgHlm/JgoEWf53f8TlkcaKr0FwnX7bcNR8tY8z/w=="
    }`

	addr, _ := sdk.AccAddressFromBech32(addrStr)
	addrSecretBytes, _ := sdk.GetFromBech32(addrSecretStr, "secret")
	addrSecret := sdk.AccAddress(addrSecretBytes)

	addrTerraBytes, _ := sdk.GetFromBech32(addrTerraStr, "terra")
	addrTerra := sdk.AccAddress(addrTerraBytes)

	pubCreator := secp256k1.GenPrivKey().PubKey()
	addrCreator := sdk.AccAddress(pubCreator.Address())

	claimRecords := []types.ClaimRecord{
		{
			ClaimAddress:           addrSecret.String(),
			InitialClaimableAmount: sdk.NewCoins(sdk.NewInt64Coin(types.DefaultClaimDenom, 1000)),
			ActionClaimed:          []bool{false, false, false, false, false},
		},
		{
			ClaimAddress:           addrTerra.String(),
			InitialClaimableAmount: sdk.NewCoins(sdk.NewInt64Coin(types.DefaultClaimDenom, 1000)),
			ActionClaimed:          []bool{false, false, false, false, false},
		},
	}

	s.app.AccountKeeper.SetAccount(s.ctx, authtypes.NewBaseAccount(addr, nil, 0, 0))
	s.app.AccountKeeper.SetAccount(s.ctx, authtypes.NewBaseAccount(addrCreator, nil, 0, 0))

	// disable airdrop
	s.app.ClaimKeeper.SetParams(s.ctx, types.Params{
		AirdropEnabled:     false,
		AirdropStartTime:   time.Now().Add(time.Hour * -1),
		ClaimDenom:         types.DefaultClaimDenom,
		DurationUntilDecay: time.Hour,
		DurationOfDecay:    time.Hour * 4,
	})

	err := s.app.ClaimKeeper.SetClaimRecords(s.ctx, claimRecords)
	s.Require().NoError(err)

	// test airdrop disabled
	msgInitialClaim := types.NewMsgInitialClaim(addrCreator.String(), secretTxSigned, secretTxSig)
	ctx := sdk.WrapSDKContext(s.ctx)
	_, err = s.msgSrvr.InitialClaim(ctx, msgInitialClaim)
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
	msgInitialClaim = types.NewMsgInitialClaim(addrCreator.String(), secretTxSigned, secretTxSigWrong)
	_, err = s.msgSrvr.InitialClaim(ctx, msgInitialClaim)
	s.Contains(err.Error(), "address is not allowed to claim")

	// test claim secret
	msgInitialClaim = types.NewMsgInitialClaim(addrCreator.String(), secretTxSigned, secretTxSig)
	_, err = s.msgSrvr.InitialClaim(ctx, msgInitialClaim)
	s.Require().NoError(err)

	claimedCoins := s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom).Quo(sdk.NewInt(5)))

	record, err := s.app.ClaimKeeper.GetClaimRecord(s.ctx, addrSecret)
	s.Require().NoError(err)
	s.Require().True(record.ActionClaimed[types.ActionInitialClaim])

	actionRecord, err := s.app.ClaimKeeper.GetActionRecord(s.ctx, addr)
	s.Require().NoError(err)
	s.Require().True(actionRecord.ActionCompleted[types.ActionInitialClaim])

	// test re-claim
	msgInitialClaim = types.NewMsgInitialClaim(addrCreator.String(), secretTxSigned, secretTxSig)
	_, err = s.msgSrvr.InitialClaim(ctx, msgInitialClaim)
	s.Require().NoError(err)

	claimedCoins = s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom).Quo(sdk.NewInt(5)))

	// test claim terra
	msgInitialClaim = types.NewMsgInitialClaim(addrCreator.String(), terraTxSigned, terraTxSig)
	_, err = s.msgSrvr.InitialClaim(ctx, msgInitialClaim)
	s.Require().NoError(err)

	claimedCoins = s.app.BankKeeper.GetAllBalances(s.ctx, addr)
	s.Require().Equal(claimedCoins.AmountOf(types.DefaultClaimDenom), claimRecords[0].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom).Quo(sdk.NewInt(5)).Add(claimRecords[1].InitialClaimableAmount.AmountOf(types.DefaultClaimDenom).Quo(sdk.NewInt(5))))

	record, err = s.app.ClaimKeeper.GetClaimRecord(s.ctx, addrTerra)
	s.Require().NoError(err)
	s.Require().True(record.ActionClaimed[types.ActionInitialClaim])

	actionRecord, err = s.app.ClaimKeeper.GetActionRecord(s.ctx, addr)
	s.Require().NoError(err)
	s.Require().True(actionRecord.ActionCompleted[types.ActionInitialClaim])
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
