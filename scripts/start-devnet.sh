#!/bin/bash

DENOM=uclan
CHAIN_ID=devnet-1
VALIDATOR_INIT_COINS=100000000000000$DENOM

rm -rf $HOME/.clan

echo "Processing airdrop snapshot..."

cland init devnetmoniker --chain-id $CHAIN_ID
cland prepare-genesis testnet $CHAIN_ID exported-claim-eth-records.json  exported-claim-records.json 

cland config chain-id $CHAIN_ID
cland config keyring-backend test
cland config output json
yes | cland keys add validator

cland add-genesis-account $(cland keys show validator -a) $VALIDATOR_INIT_COINS

cland gentx validator 1000000000000$DENOM --chain-id $CHAIN_ID --keyring-backend test
cland collect-gentxs
cland validate-genesis
cland start