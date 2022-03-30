package cmd

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/sha3"
)

const (
	flagMinTango = "minTango"
)

type TangoHolders struct {
    Holders []TangoHolder `json:"holders"`
}

type TangoHolder struct {
    EthAddress   string `json:"address"`
    Balance   float64 `json:"total"`
}


func toChecksumAddress(address string) string {
	address = strings.Replace(strings.ToLower(address), "0x", "", 1)
	hash := sha3.NewLegacyKeccak256()
	_, _ = hash.Write([]byte(address))
	sum := hash.Sum(nil)
	digest := hex.EncodeToString(sum)

	b := strings.Builder{}
	b.WriteString("0x")

	for i := 0; i < len(address); i++ {
		a := address[i]
		if a > '9' {
			d, _ := strconv.ParseInt(digest[i:i+1], 16, 8)

			if d >= 8 {
				// Upper case it
				a -= 'a' - 'A'
				b.WriteByte(a)
			} else {
				// Keep it lower
				b.WriteByte(a)
			}
		} else {
			// Keep it lower
			b.WriteByte(a)
		}
	}

	return b.String()
}


func ExportTangoSnapshotCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "export-tango-snapshot [input-genesis-file] [output-snapshot-json] [clan-allocation] --minTango=[minTango]",
		Short: "Export snapshot from a provided TANGO holders snapshot file",
		Long: `Export snapshot from a provided TANGO holders snapshot file"
			   Example:
			   cland export-tango-snapshot airdrop-snapshot-tango.json airdrop-snapshot-tango-output.json 160000000000000 --minTango=100
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			var clientCtx = client.GetClientContextFromCmd(cmd)

			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)
	
			tangoHoldersFile := args[0]
			outputFile := args[1]
			clanAllocation := args[2]
			minTango := float64(0)
			minTangoStr, err := cmd.Flags().GetString(flagMinTango)
			if err == nil && len(minTangoStr) > 0 {
				minTango, err = strconv.ParseFloat(minTangoStr, 64)
				if err != nil {
					return fmt.Errorf("failed to parse minTango: %s %w", minTangoStr, err)
				}
			}

			fmt.Printf("Exporting snapshot with min TANGO %f...", minTango)

			byteValue, _ := ioutil.ReadFile(tangoHoldersFile)

			var holders TangoHolders

			json.Unmarshal(byteValue, &holders)

			// init variables
			var snapshot Snapshot
			snapshotAccs := make(map[string]SnapshotAccount)
			totalTangoBalance := sdk.ZeroInt()

			// check clan allocation validity
			clanAllocationInt, ok := sdk.NewIntFromString(clanAllocation)
			if !ok {
				return fmt.Errorf("failed to parse clan-allocation to number: %s", clanAllocation)
			}

			totalAirdropAccounts := 0

			// Go through all holders and checksum their address + cal total TANGO balance 
			for _, holder := range holders.Holders {
				address := holder.EthAddress

				if holder.Balance < minTango {
					continue
				}

				intBalance :=  sdk.NewInt(int64(holder.Balance))
				checksummedAddress := toChecksumAddress(address)
				totalTangoBalance = totalTangoBalance.Add(intBalance)
				totalAirdropAccounts = totalAirdropAccounts + 1
				acc := SnapshotAccount{
					Address:              checksummedAddress,
					StakedBalance:            intBalance,
					AirdropOwnershipPercent: sdk.ZeroDec(),
				}
				snapshotAccs[checksummedAddress] = acc
			}

			// Calculate clan balance for each holder
			for _, holder := range snapshotAccs {
				ownershipPercent := holder.StakedBalance.ToDec().QuoInt(totalTangoBalance)
				holder.AirdropOwnershipPercent = ownershipPercent
				snapshotAccs[holder.Address] = holder
			}

			snapshot.Accounts = snapshotAccs	
			snapshot.TotalClanAllocation = clanAllocationInt		
			snapshot.TotalAirdropAccounts = totalAirdropAccounts		

			// write results to output file
			snapshotJSON, err := json.MarshalIndent(snapshot, "", "    ")
			if err != nil {
				return fmt.Errorf("failed to marshal snapshot: %w", err)
			}

			err = ioutil.WriteFile(outputFile, snapshotJSON, 0600)
			return err
			
		},
	}

	cmd.Flags().String(flagMinTango, "", "TANGO minimun balace")
	flags.AddQueryFlagsToCmd(cmd)
	
	return cmd
}