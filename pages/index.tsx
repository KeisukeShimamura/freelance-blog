import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Post } from '../types/post'
import { getPosts } from '../lib/post'
import PostItemCard from '../components/post-item-card'
import Pagination from '../components/pagination'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import Layout from '../components/layout'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
}> = () => {
  const { posts, count } = getPosts(undefined, PAGE_SIZE, 1)
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  return {
    props: {
      posts,
      pages,
    },
  }
}

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts, pages }: { posts: Post[]; pages: number[] }) => {
  return (
    <>
      <section>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination pages={pages} currentPage={1} />
      </section>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
