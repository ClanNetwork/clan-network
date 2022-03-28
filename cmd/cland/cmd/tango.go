package cmd

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/sha3"
)

// Users struct which contains
// an array of users
type TangoHolders struct {
    Holders []TangoHolder `json:"holders"`
}

// User struct which contains a name
// a type and a list of social links
type TangoHolder struct {
    EthAddress   string `json:"address"`
    Balance   float64 `json:"total"`
}

type SnapshotOutputTango struct {
	Accounts                      map[string]SnapshotAccountTango `json:"accounts"`
	TotalAirdropAccounts          uint64                     `json:"total_airdrop_accounts"`
	TotalClanAllocation           sdk.Int                    `json:"total_allocated_clan"`
}

// SnapshotAccount provide fields of snapshot per account
type SnapshotAccountTango struct {
	EthAddress				string  `json:"eth_address"`
	TotalBalance			sdk.Int `json:"total_balance"`
	ClanAllocation 			sdk.Int `json:"clan_balance"`
	AirdropOwnershipPercent sdk.Dec `json:"ownership_percent"`
}

func ToChecksumAddress(address string) string {
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
		Use:   "export-tango-snapshot [input-genesis-file] [clan-allocation] [output-snapshot-json]",
		Short: "Export snapshot from a provided TANGO holders snapshot file",
		Long: `Export snapshot from a provided TANGO holders snapshot file"
Example:
	cland export-tango-snapshot tango-holders.json 160000000000000 hub-snapshot.json
`,

		RunE: func(cmd *cobra.Command, args []string) error {

			var clientCtx = client.GetClientContextFromCmd(cmd)

			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)
	
			tangoHoldersFile := args[0]
			clanAllocation := args[1]
			outputFile := args[2]


			byteValue, _ := ioutil.ReadFile(tangoHoldersFile)

			var holders TangoHolders

			json.Unmarshal(byteValue, &holders)

			// init variables
			var snapshot SnapshotOutputTango
			snapshotAccs := make(map[string]SnapshotAccountTango)
			totalTangoBalance := sdk.ZeroInt()

			// check clan allocation validity
			clanAllocationInt, ok := sdk.NewIntFromString(clanAllocation)
			if !ok {
				return fmt.Errorf("failed to parse clan-allocation to number: %s", clanAllocation)
			}
			

			// Go through all holders and checksum their address + cal total TANGO balance 
			for _, holder := range holders.Holders {
				address := holder.EthAddress

				validAddress, _ := regexp.MatchString("^(0x)?[0-9a-f]{40}", address) 
				if !validAddress {
					fmt.Printf("Given address %v is not a valid Ethereum Address\n", address)
					continue
				} 

				if holder.Balance < 100.0 {
					continue
				}

				intBalance :=  sdk.NewInt(int64(holder.Balance))
				checksummedAddress := ToChecksumAddress(address)
				totalTangoBalance = totalTangoBalance.Add(intBalance)
				acc := SnapshotAccountTango{
					EthAddress:              checksummedAddress,
					TotalBalance:            intBalance,
					ClanAllocation: 		 sdk.ZeroInt(),
					AirdropOwnershipPercent: sdk.ZeroDec(),
				}
				snapshotAccs[checksummedAddress] = acc
			}

			// Calculate clan balance for each holder
			for _, holder := range snapshotAccs {
				ownershipPercent := holder.TotalBalance.ToDec().QuoInt(totalTangoBalance)
				clanAllocation := ownershipPercent.MulInt(clanAllocationInt)
				holder.ClanAllocation = clanAllocation.RoundInt()
				holder.AirdropOwnershipPercent = ownershipPercent
				snapshotAccs[holder.EthAddress] = holder
			}

			snapshot.Accounts = snapshotAccs	
			snapshot.TotalClanAllocation = clanAllocationInt		

			// write results to output file
			snapshotJSON, err := json.MarshalIndent(snapshot, "", "    ")
			if err != nil {
				return fmt.Errorf("failed to marshal snapshot: %w", err)
			}

			err = ioutil.WriteFile(outputFile, snapshotJSON, 0600)
			return err
			
		},
	}

	return cmd
}