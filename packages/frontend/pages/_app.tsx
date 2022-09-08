import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import {
  getDefaultWallets, midnightTheme, RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import "@rainbow-me/rainbowkit/styles.css";
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ALCHEMY_KEY } from 'constant';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';
import { client } from 'utils/apollo';
import { useEffect } from 'react';
import { RealViewportProvider } from "next-real-viewport";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Updater from 'components/Updater/updater';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.localhost, chain.rinkeby],
  [
    alchemyProvider({ apiKey: ALCHEMY_KEY }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Coffee Chat',
  chains
});

const appInfo = {
  appName: 'Coffee Chat',

}

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={appInfo} chains={chains} showRecentTransactions={true}>
          <RealViewportProvider>
            <Updater />
            <GoogleAnalytics trackPageViews />
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </RealViewportProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}

export default MyApp
