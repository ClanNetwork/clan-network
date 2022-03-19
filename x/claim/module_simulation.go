package claim

import (
	"math/rand"

	"github.com/ClanNetwork/clan-network/testutil/sample"
	claimsimulation "github.com/ClanNetwork/clan-network/x/claim/simulation"
	"github.com/ClanNetwork/clan-network/x/claim/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = claimsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgInitialClaim = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgInitialClaim int = 100

	opWeightMsgClaimFor = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgClaimFor int = 100

	opWeightMsgClaimFroEthAddress = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgClaimFroEthAddress int = 100

	opWeightMsgCreateClaimEthRecord = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateClaimEthRecord int = 100

	opWeightMsgUpdateClaimEthRecord = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateClaimEthRecord int = 100

	opWeightMsgDeleteClaimEthRecord = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteClaimEthRecord int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	claimGenesis := types.GenesisState{
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&claimGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {
	claimParams := types.DefaultParams()
	return []simtypes.ParamChange{
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyAirdropStartTime), func(r *rand.Rand) string {
			return string(types.Amino.MustMarshalJSON(claimParams.AirdropStartTime))
		}),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyDurationUntilDecay), func(r *rand.Rand) string {
			return string(types.Amino.MustMarshalJSON(claimParams.DurationUntilDecay))
		}),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyDurationOfDecay), func(r *rand.Rand) string {
			return string(types.Amino.MustMarshalJSON(claimParams.DurationOfDecay))
		}),
		simulation.NewSimParamChange(types.ModuleName, string(types.KeyClaimDenom), func(r *rand.Rand) string {
			return string(types.Amino.MustMarshalJSON(claimParams.ClaimDenom))
		}),
	}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgInitialClaim int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgInitialClaim, &weightMsgInitialClaim, nil,
		func(_ *rand.Rand) {
			weightMsgInitialClaim = defaultWeightMsgInitialClaim
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgInitialClaim,
		claimsimulation.SimulateMsgInitialClaim(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgClaimFroEthAddress int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgClaimFroEthAddress, &weightMsgClaimFroEthAddress, nil,
		func(_ *rand.Rand) {
			weightMsgClaimFroEthAddress = defaultWeightMsgClaimFroEthAddress
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgClaimFroEthAddress,
		claimsimulation.SimulateMsgClaimFroEthAddress(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
