package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"github.com/spf13/cobra"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	tmtypes "github.com/tendermint/tendermint/types"

	claimtypes "github.com/ClanNetwork/clan-network/x/claim/types"
)

const (
    HumanCoinUnit       = "clan"
    BaseCoinUnit        = "uclan"
    Exponent       = 6
    Bech32PrefixAccAddr = "clan"
)

type GenesisParams struct {
    AirdropSupply sdk.Int

    StrategicReserveAccounts []banktypes.Balance

    ConsensusParams *tmproto.ConsensusParams

    GenesisTime         time.Time
    NativeCoinMetadatas []banktypes.Metadata

    StakingParams      stakingtypes.Params
    DistributionParams distributiontypes.Params
    GovParams          govtypes.Params

    CrisisConstantFee sdk.Coin

    SlashingParams slashingtypes.Params

    ClaimParams claimtypes.Params
}

func PrepareGenesisCmd(defaultNodeHome string, mbm module.BasicManager) *cobra.Command {
    cmd := &cobra.Command{
        Use:   "prepare-genesis [network] [chainID] [claimEthRecords] [claimRecords] [file]",
        Short: "Prepare a genesis file with initial setup",
        Long: `Prepare a genesis file with initial setup.
        Examples include:
            - Setting module initial params
            - Setting denom metadata
        Example:
            cland prepare-genesis mainnet clan-testnet-1 claim-eth-records.json claim-records.json snapshot.json
            - Check input genesis:
                file is at ~/.clan/config/genesis.json
`,
        Args: cobra.ExactArgs(5),
        RunE: func(cmd *cobra.Command, args []string) error {
            clientCtx := client.GetClientContextFromCmd(cmd)
            cdc := clientCtx.Codec

            serverCtx := server.GetServerContextFromCmd(cmd)
            config := serverCtx.Config
            config.SetRoot(clientCtx.HomeDir)

            fmt.Printf("Preparing genesis file...\n")

            // read genesis file
            genFile := config.GenesisFile()
            appState, genDoc, err := genutiltypes.GenesisStateFromGenFile(genFile)
            if err != nil {
                return fmt.Errorf("failed to unmarshal genesis state: %w", err)
            }

            genesisParams := TestnetGenesisParams()

            chainID := args[1]
            // claimEthRecordsFile := args[2]
            // claimRecordsFile := args[3]

            // read snapshot.json and parse into struct
            snapshotFile, _ := ioutil.ReadFile(args[4])
            snapshot := Snapshot{}

            err = json.Unmarshal(snapshotFile, &snapshot)
            if err != nil {
                panic(err)
            }

            // run Prepare Genesis
            appState, genDoc, err = PrepareGenesis(clientCtx, appState, genDoc, genesisParams, chainID, snapshot)
            if err != nil {
                return fmt.Errorf("failed to prepare genesis: %w", err)
            }

            // validate genesis state
            if err = mbm.ValidateGenesis(cdc, clientCtx.TxConfig, appState); err != nil {
                return fmt.Errorf("error validating genesis file: %s", err.Error())
            }

            // save genesis
            appStateJSON, err := json.Marshal(appState)
            if err != nil {
                return fmt.Errorf("failed to marshal application genesis state: %w", err)
            }

            genDoc.AppState = appStateJSON
            err = genutil.ExportGenesisFile(genDoc, genFile)
            return err
        },
    }

    cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
    flags.AddQueryFlagsToCmd(cmd)

    return cmd
}

// fill with data
func PrepareGenesis(
    clientCtx client.Context,
    appState map[string]json.RawMessage,
    genDoc *tmtypes.GenesisDoc,
    genesisParams GenesisParams,
    chainID string,
    snapshot Snapshot,
) (map[string]json.RawMessage, *tmtypes.GenesisDoc, error) {
    cdc := clientCtx.Codec

    // chain params genesis
    genDoc.GenesisTime = genesisParams.GenesisTime
    genDoc.ChainID = chainID
    genDoc.ConsensusParams = genesisParams.ConsensusParams

    // staking module genesis
    stakingGenState := stakingtypes.GetGenesisStateFromAppState(cdc, appState)
    stakingGenState.Params = genesisParams.StakingParams
    stakingGenStateBz, err := cdc.MarshalJSON(stakingGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal staking genesis state: %w", err)
    }
    appState[stakingtypes.ModuleName] = stakingGenStateBz

    // distribution module genesis
    distributionGenState := distributiontypes.DefaultGenesisState()
    distributionGenState.Params = genesisParams.DistributionParams
    distributionGenStateBz, err := cdc.MarshalJSON(distributionGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal distribution genesis state: %w", err)
    }
    appState[distributiontypes.ModuleName] = distributionGenStateBz

    // gov module genesis
    govGenState := govtypes.DefaultGenesisState()
    govGenState.DepositParams = genesisParams.GovParams.DepositParams
    govGenState.TallyParams = genesisParams.GovParams.TallyParams
    govGenState.VotingParams = genesisParams.GovParams.VotingParams
    govGenStateBz, err := cdc.MarshalJSON(govGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal gov genesis state: %w", err)
    }
    appState[govtypes.ModuleName] = govGenStateBz

    // slashing module genesis
    slashingGenState := slashingtypes.DefaultGenesisState()
    slashingGenState.Params = genesisParams.SlashingParams
    slashingGenStateBz, err := cdc.MarshalJSON(slashingGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal slashing genesis state: %w", err)
    }
    appState[slashingtypes.ModuleName] = slashingGenStateBz

    // auth accounts
    authGenState := authtypes.GetGenesisStateFromAppState(cdc, appState)
    accs, err := authtypes.UnpackAccounts(authGenState.Accounts)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to get accounts from any: %w", err)
    }


    bankGenState := banktypes.GetGenesisStateFromAppState(cdc, appState)
    bankGenState.Params.DefaultSendEnabled = true
    bankGenState.DenomMetadata = genesisParams.NativeCoinMetadatas
    balances := bankGenState.Balances

    // // claim module genesis
    // claimGenState := claimtypes.GetGenesisStateFromAppState(cdc, appState)
    // claimGenState.Params = genesisParams.ClaimParams
    // claimRecords := make([]claimtypes.ClaimRecord, 0, len(snapshot.Accounts))
    // claimsTotal := sdk.ZeroInt()

    // claimGenState.ClaimRecords = claimRecords
    // claimGenState.ModuleAccountBalance = sdk.NewCoin(BaseCoinUnit, claimsTotal)
    // claimGenStateBz, err := cdc.MarshalJSON(claimGenState)
    // if err != nil {
    //  return nil, nil, fmt.Errorf("failed to marshal claim genesis state: %w", err)
    // }
    // appState[claimtypes.ModuleName] = claimGenStateBz

    // save accounts

    // auth module genesis
    accs = authtypes.SanitizeGenesisAccounts(accs)
    genAccs, err := authtypes.PackAccounts(accs)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to convert accounts into any's: %w", err)
    }
    authGenState.Accounts = genAccs
    authGenStateBz, err := cdc.MarshalJSON(&authGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal auth genesis state: %w", err)
    }
    appState[authtypes.ModuleName] = authGenStateBz

    // save balances
    bankGenState.Balances = banktypes.SanitizeGenesisBalances(balances)
    bankGenStateBz, err := cdc.MarshalJSON(bankGenState)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal bank genesis state: %w", err)
    }
    appState[banktypes.ModuleName] = bankGenStateBz

    return appState, genDoc, nil
}

func MainnetGenesisParams() GenesisParams {
    genParams := GenesisParams{}

    genParams.AirdropSupply = sdk.NewInt(334_250_000_000_000)              
    genParams.GenesisTime = time.Date(2022, 4, 4, 0, 0, 0, 0, time.UTC) 

    genParams.NativeCoinMetadatas = []banktypes.Metadata{
        {
            Description: "The native token of Clan Network",
            DenomUnits: []*banktypes.DenomUnit{
                {
                    Denom:    BaseCoinUnit,
                    Exponent: 0,
                    Aliases:  nil,
                },
                {
                    Denom:    HumanCoinUnit,
                    Exponent: Exponent,
                    Aliases:  nil,
                },
            },
            Name:    "CLAN",
            Base:    BaseCoinUnit,
            Display: HumanCoinUnit,
            Symbol:  "CLAN",
        },
    }


    genParams.StakingParams = stakingtypes.DefaultParams()
    genParams.StakingParams.UnbondingTime = time.Hour * 24 * 7 * 2 // 2 weeks
    genParams.StakingParams.MaxValidators = 100
    genParams.StakingParams.BondDenom = genParams.NativeCoinMetadatas[0].Base
    // MinCommissionRate is enforced in ante-handler

    genParams.GovParams = govtypes.DefaultParams()
    genParams.GovParams.DepositParams.MaxDepositPeriod = time.Hour * 24 * 14 // 2 weeks
    genParams.GovParams.DepositParams.MinDeposit = sdk.NewCoins(sdk.NewCoin(
        genParams.NativeCoinMetadatas[0].Base,
        sdk.NewInt(1_000_000_000),
    ))
    genParams.GovParams.TallyParams.Quorum = sdk.MustNewDecFromStr("0.2") // 20%
    genParams.GovParams.VotingParams.VotingPeriod = time.Hour * 24 * 3    // 3 days

    genParams.CrisisConstantFee = sdk.NewCoin(
        genParams.NativeCoinMetadatas[0].Base,
        sdk.NewInt(100_000_000_000),
    )

    genParams.SlashingParams = slashingtypes.DefaultParams()
    genParams.SlashingParams.SignedBlocksWindow = int64(25000)                       // ~41 hr at 6 second blocks
    genParams.SlashingParams.MinSignedPerWindow = sdk.MustNewDecFromStr("0.05")      // 5% minimum liveness
    genParams.SlashingParams.DowntimeJailDuration = time.Minute                      // 1 minute jail period
    genParams.SlashingParams.SlashFractionDoubleSign = sdk.MustNewDecFromStr("0.05") // 5% double sign slashing
    genParams.SlashingParams.SlashFractionDowntime = sdk.MustNewDecFromStr("0.0001") // 0.01% liveness slashing

    genParams.ClaimParams = claimtypes.Params{
        AirdropEnabled:     false,
        AirdropStartTime:   genParams.GenesisTime.Add(time.Hour * 24 * 365), // 1 year (will be changed by gov)
        DurationUntilDecay: time.Hour * 24 * 120,                            // 120 days = ~4 months
        DurationOfDecay:    time.Hour * 24 * 120,                            // 120 days = ~4 months
        ClaimDenom:         genParams.NativeCoinMetadatas[0].Base,
    }





    return genParams
}

func TestnetGenesisParams() GenesisParams {
    genParams := MainnetGenesisParams()


    genParams.GovParams.DepositParams.MaxDepositPeriod = time.Hour * 24 * 14 // 2 weeks
    genParams.GovParams.DepositParams.MinDeposit = sdk.NewCoins(sdk.NewCoin(
        genParams.NativeCoinMetadatas[0].Base,
        sdk.NewInt(1_000_000),
    ))

    genParams.GovParams.TallyParams.Quorum = sdk.MustNewDecFromStr("0.1") // 10%
    genParams.GovParams.VotingParams.VotingPeriod = time.Minute * 15      // 15 min

    return genParams
}
