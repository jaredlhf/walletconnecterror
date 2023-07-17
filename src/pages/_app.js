import "@/styles/globals.css";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { getNetworkCredentials } from "../clients";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";

const network = process.env.NEXT_PUBLIC_NETWORK || "SandNet";
const cred = getNetworkCredentials(network);

const App = ({ Component, pageProps }) => {
  const getDefaultAlgodCredentials = () => {
    let token = process.env.NEXT_PUBLIC_ALGOD_TOKEN_TESTNET;
    let address = process.env.NEXT_PUBLIC_ALGOD_ADDRESS_TESTNET;
    let port = process.env.NEXT_PUBLIC_ALGOD_PORT_TESTNET;
    const setting = {
      network: "TestNet" || "",
      nodeServer: address || "",
      nodeToken: token || "",
      nodePort: port || "",
    };

    return setting;
  };

  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    ],
    nodeConfig: {
      ...getDefaultAlgodCredentials(),
    },
  });

  return (
    <WalletProvider value={walletProviders}>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default App;
