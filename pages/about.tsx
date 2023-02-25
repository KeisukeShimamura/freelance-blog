import React, { ReactElement } from 'react'
import Layout from '../components/layout'
import { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = () => {
  return <div>About</div>
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default About
