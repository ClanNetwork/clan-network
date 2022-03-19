package types

import (
	"fmt"
	"strings"
	time "time"

	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gopkg.in/yaml.v2"
)

var _ paramtypes.ParamSet = (*Params)(nil)

var (
	KeyAirdropEnabled             = []byte("AirdropEnabled")
	DefaultKeyAirdropEnabled bool = true
)

var (
	KeyAirdropStartTime               = []byte("AirdropStartTime")
	DefaultAirdropStartTime time.Time = time.Now()
)

var (
	KeyDurationUntilDecay                   = []byte("DurationUntilDecay")
	DefaultDurationUntilDecay time.Duration = time.Hour
)

var (
	KeyDurationOfDecay                   = []byte("DurationOfDecay")
	DefaultDurationOfDecay time.Duration = time.Hour * 5
)

var (
	KeyClaimDenom            = []byte("ClaimDenom")
	DefaultClaimDenom string = "clan"
)

// ParamKeyTable the param key table for launch module
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

// NewParams creates a new Params instance
func NewParams(enabled bool, claimDenom string, startTime time.Time, durationUntilDecay, durationOfDecay time.Duration) Params {
	return Params{
		AirdropEnabled:     enabled,
		ClaimDenom:         claimDenom,
		AirdropStartTime:   startTime,
		DurationUntilDecay: durationUntilDecay,
		DurationOfDecay:    durationOfDecay,
	}
}

// DefaultParams returns a default set of parameters
func DefaultParams() Params {
	return NewParams(
		DefaultKeyAirdropEnabled,
		DefaultClaimDenom,
		DefaultAirdropStartTime,
		DefaultDurationUntilDecay,
		DefaultDurationOfDecay,
	)
}

// ParamSetPairs get the params.ParamSet
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyAirdropEnabled, &p.AirdropEnabled, validateAirdropEnabled),
		paramtypes.NewParamSetPair(KeyAirdropStartTime, &p.AirdropStartTime, validateAirdropStartTime),
		paramtypes.NewParamSetPair(KeyDurationUntilDecay, &p.DurationUntilDecay, validateDuration),
		paramtypes.NewParamSetPair(KeyDurationOfDecay, &p.DurationOfDecay, validateDuration),
		paramtypes.NewParamSetPair(KeyClaimDenom, &p.ClaimDenom, validateClaimDenom),
	}
}

// Validate validates the set of params
func (p Params) Validate() error {
	if err := validateAirdropEnabled(p.AirdropEnabled); err != nil {
		return err
	}
	if err := validateAirdropStartTime(p.AirdropStartTime); err != nil {
		return err
	}

	if err := validateDuration(p.DurationUntilDecay); err != nil {
		return err
	}

	if err := validateDuration(p.DurationOfDecay); err != nil {
		return err
	}

	if err := validateClaimDenom(p.ClaimDenom); err != nil {
		return err
	}

	return nil
}

func (p Params) IsAirdropEnabled(t time.Time) bool {
	if !p.AirdropEnabled {
		return false
	}
	if p.AirdropStartTime.IsZero() {
		return false
	}
	if t.Before(p.AirdropStartTime) {
		return false
	}
	return true
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

func validateAirdropEnabled(i interface{}) error {
	_, ok := i.(bool)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}
	return nil
}

// validateAirdropStartTime validates the AirdropStartTime param
func validateAirdropStartTime(v interface{}) error {
	_, ok := v.(time.Time)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	return nil
}

func validateDuration(v interface{}) error {
	duration, ok := v.(time.Duration)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	if duration < 1 {
		return fmt.Errorf("duration must be greater than or equal to 1: %d", duration)
	}

	return nil
}

// validateClaimDenom validates the ClaimDenom param
func validateClaimDenom(v interface{}) error {
	claimDenom, ok := v.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", v)
	}

	if strings.TrimSpace(claimDenom) == "" {
		return fmt.Errorf("invalid denom: %s", v)
	}

	return nil
}
