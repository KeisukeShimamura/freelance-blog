import Pagination from '../../components/pagination'
import PostItemCard from '../../components/post-item-card'
import { Category, Post, Tag } from '../../types/post'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import { getCategories, getPosts, getTags } from '../../lib/post'
import { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import { ReactElement } from 'react'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  currentPage: number
  tags: Tag[]
  categories: Category[]
}> = (context) => {
  const currentPage = Number(context.params?.page)
  const { posts, count } = getPosts(
    undefined,
    undefined,
    PAGE_SIZE,
    currentPage
  )
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  const tags = getTags()
  const categories = getCategories()
  return {
    props: {
      posts,
      pages,
      currentPage,
      tags,
      categories,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  let paths: any[] = []
  const { count } = getPosts()
  Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      if (i > 1) {
        paths.push({
          params: {
            page: i.toString(),
          },
        })
      }
    })
  return {
    paths,
    fallback: false,
  }
}

const Page: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  posts,
  pages,
  currentPage,
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
}) => {
  return (
    <>
      <section>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination pages={pages} currentPage={currentPage} />
      </section>
    </>
  )
}

Page.getLayout = function getLayout(
  page: ReactElement,
  pageProps: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout tags={pageProps.tags} categories={pageProps.categories}>
      {page}
    </Layout>
  )
}

export default Page
