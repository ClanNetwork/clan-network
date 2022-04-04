// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgClaimAddressSigned } from "./types/clan/claim/v1beta1/tx";
import { MsgInitialClaim } from "./types/clan/claim/v1beta1/tx";
import { MsgClaimForEthAddress } from "./types/clan/claim/v1beta1/tx";


const types = [
  ["/ClanNetwork.clannetwork.claim.v1beta1.MsgClaimAddressSigned", MsgClaimAddressSigned],
  ["/ClanNetwork.clannetwork.claim.v1beta1.MsgInitialClaim", MsgInitialClaim],
  ["/ClanNetwork.clannetwork.claim.v1beta1.MsgClaimForEthAddress", MsgClaimForEthAddress],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgClaimAddressSigned: (data: MsgClaimAddressSigned): EncodeObject => ({ typeUrl: "/ClanNetwork.clannetwork.claim.v1beta1.MsgClaimAddressSigned", value: MsgClaimAddressSigned.fromPartial( data ) }),
    msgInitialClaim: (data: MsgInitialClaim): EncodeObject => ({ typeUrl: "/ClanNetwork.clannetwork.claim.v1beta1.MsgInitialClaim", value: MsgInitialClaim.fromPartial( data ) }),
    msgClaimForEthAddress: (data: MsgClaimForEthAddress): EncodeObject => ({ typeUrl: "/ClanNetwork.clannetwork.claim.v1beta1.MsgClaimForEthAddress", value: MsgClaimForEthAddress.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};