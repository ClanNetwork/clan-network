package types

import (
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
)

// Parameter store keys
var (
	KeyDistributionProportions = []byte("DistributionProportions")
)

// ParamTable for module.
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

func NewParams(
	distrProportions DistributionProportions,
) Params {
	return Params{
		DistributionProportions: distrProportions,
	}
}

// default module parameters
func DefaultParams() Params {
	return Params{
		DistributionProportions: DistributionProportions{
			CoreDev: WeightedAddress{Address: "clan1llllllllllllllllllllllllllllllllq34zf2", Weight: sdk.NewDecWithPrec(25, 2)}, // 25%
			Dao:     WeightedAddress{Address: "clan1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqvq5dwq", Weight: sdk.NewDecWithPrec(40, 2)}, // 40%
		},
	}
}

// validate params
func (p Params) Validate() error {
	return validateDistributionProportions(p.DistributionProportions)
}

// Implements params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyDistributionProportions, &p.DistributionProportions, validateDistributionProportions),
	}
}

func validateDistributionProportions(i interface{}) error {
	v, ok := i.(DistributionProportions)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	_, err := sdk.AccAddressFromBech32(v.CoreDev.Address)
	if err != nil {
		return fmt.Errorf("invalid Core Dev address: \"%s\": %e", v.CoreDev.Address, err)
	}

	_, err = sdk.AccAddressFromBech32(v.Dao.Address)
	if err != nil {
		return fmt.Errorf("invalid DAO address: \"%s\": %e", v.Dao.Address, err)
	}

	totalProportions := v.CoreDev.Weight.Add(v.Dao.Weight)

	if totalProportions.GT(sdk.NewDecWithPrec(100, 2)) {
		return errors.New("total distributions ratio cannot be more than 100%")
	}

	return nil
}
