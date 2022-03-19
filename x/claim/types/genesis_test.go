package types_test

import (
	"testing"
	time "time"

	"github.com/ClanNetwork/clan-network/x/claim/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{
				// this line is used by starport scaffolding # types/genesis/validField
				ModuleAccountBalance: sdk.NewCoin(sdk.DefaultBondDenom, sdk.ZeroInt()),
				Params: types.Params{
					AirdropEnabled:     true,
					AirdropStartTime:   time.Time{},
					DurationUntilDecay: time.Hour * 24 * 60,
					DurationOfDecay:    time.Hour * 24 * 30 * 4,
					ClaimDenom:         sdk.DefaultBondDenom,
				},
				ClaimRecords:    []types.ClaimRecord{},
				ClaimEthRecords: []types.ClaimEthRecord{},
			},
			valid: true,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
