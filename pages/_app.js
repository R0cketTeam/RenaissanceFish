import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { DataProvider } from "../components/DataContext"

const queryClient = new QueryClient()

const Chain = {
  id: 11822,
  name: 'Artela Testnet',
  iconUrl: 'https://avatars.githubusercontent.com/u/125658497?s=200&v=4',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Artela', symbol: 'ART', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://betanet-rpc1.artela.network'] },
  },
  blockExplorers: {
    default: { name: 'ArtelaExplorer', url: 'https://betanet-scan.artela.network' },
  },
};




const config = getDefaultConfig({
  appName: 'Raffle',
  projectId: '6748d532ac67647cd2eec1b96272ba77',
  chains: [Chain],
  ssr: true, // If your dApp uses server side rendering (SSR)
});



function MyApp({ Component, pageProps }) {

  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#1e40af',
            accentColorForeground: 'white',
            borderRadius: 'none',
          })}
        >
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default MyApp;
