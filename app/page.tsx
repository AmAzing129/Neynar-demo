"use client";
import { Connector, ConnectButton } from "@ant-design/web3";
import { MetaMask, WagmiWeb3ConfigProvider } from "@ant-design/web3-wagmi";
import { createConfig, http, useAccount } from "wagmi";
import { base } from "wagmi/chains";
import { getUserInfoByWalletAddress } from "./api";
import { useEffect, useState } from "react";

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

const ConnectorBtn = ({ setName }: { setName: (name: string) => void }) => {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      getUserInfoByWalletAddress(address).then((user) => {
        setName(user.display_name);
      });
    }
  }, [address]);

  return (
    <Connector modalProps={{ mode: "simple" }}>
      <ConnectButton />
    </Connector>
  );
};

export default function Page() {
  const [name, setName] = useState("");

  return (
    <>
      <WagmiWeb3ConfigProvider
        eip6963={{ autoAddInjectedWallets: true }}
        wallets={[MetaMask()]}
        config={config}
      >
        <ConnectorBtn setName={setName} />
      </WagmiWeb3ConfigProvider>
      <div>{name}</div>
    </>
  );
}
