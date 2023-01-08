import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import nextSeoConfig from '../next-seo.config'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...nextSeoConfig} />
      <Component {...pageProps} />
    </Layout>
  )
}
