import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../lib/AuthContext'

import { Layout } from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider><Layout><Component {...pageProps} /></Layout></AuthProvider>
}

export default MyApp