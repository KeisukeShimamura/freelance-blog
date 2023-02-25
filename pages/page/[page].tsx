import Pagination from '../../components/pagination'
import PostItemCard from '../../components/post-item-card'
import { Post } from '../../types/post'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import { getPosts } from '../../lib/post'
import { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import { ReactElement } from 'react'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  currentPage: number
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
  return {
    props: {
      posts,
      pages,
      currentPage,
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
