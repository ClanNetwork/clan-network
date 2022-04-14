#!/bin/bash

DENOM=uclan
CHAIN_ID=testnet-1
VALIDATOR_INIT_COINS=100000000000000$DENOM
FAUCET_INIT_COINS=50000000000000$DENOM
ORACLE_INIT_COINS=1000000$DENOM

rm -rf $HOME/.clan

echo "Processing airdrop snapshot..."

cland init devnetmoniker --chain-id $CHAIN_ID
cland prepare-genesis testnet $CHAIN_ID exported-claim-eth-records.json  exported-claim-records.json 

cland config chain-id $CHAIN_ID
cland config keyring-backend test
cland config output json

cland add-genesis-account clan10jq29ktde4xpges8ah0z4r48ywqsj7029u9f5c $VALIDATOR_INIT_COINS
cland add-genesis-account clan147m4eyj8ejcax2k5a96ag5yxan8884p37qnn9z $ORACLE_INIT_COINS
cland add-genesis-account clan1anl88fsxy2pucyxdxme8pmpmw779lvhhn0faks $FAUCET_INIT_COINS

cland validate-genesis