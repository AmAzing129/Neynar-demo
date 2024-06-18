"use server";

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export const getUserInfoByWalletAddress = async (address: string) => {
  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
  const user = await client.fetchBulkUsersByEthereumAddress([address]);
  return user[address.toLocaleLowerCase()][0];
};
