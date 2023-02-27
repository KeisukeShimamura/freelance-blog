import '../styles/globals.css'
import type { AppProps } from 'next/app'
import nextSeoConfig from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { InferGetStaticPropsType, NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    pageProps: InferGetStaticPropsType<any>
  ) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <DefaultSeo {...nextSeoConfig} />
      <Component {...pageProps} />
    </>,
    pageProps
  )
}
