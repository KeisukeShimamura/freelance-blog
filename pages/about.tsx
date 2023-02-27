import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { ReactElement } from 'react'
import Layout from '../components/layout'
import { getCategories, getTags } from '../lib/post'
import { Category, Tag } from '../types/post'
import { NextPageWithLayout } from './_app'

export const getStaticProps: GetStaticProps<{
  tags: Tag[]
  categories: Category[]
}> = () => {
  const tags = getTags()
  const categories = getCategories()
  return {
    props: {
      tags,
      categories,
    },
  }
}

const About: NextPageWithLayout = () => {
  return <div>About</div>
}

About.getLayout = function getLayout(
  page: ReactElement,
  pageProps: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout tags={pageProps.tags} categories={pageProps.categories}>
      {page}
    </Layout>
  )
}

export default About
