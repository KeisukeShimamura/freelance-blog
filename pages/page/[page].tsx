import Pagination from '../../components/pagination'
import PostItemCard from '../../components/post-item-card'
import { Post } from '../../types/post'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPosts } from '../../lib/post'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = (context) => {
  const currentPage = Number(context.params?.page)
  const { posts, count } = getPosts(undefined, PAGE_SIZE, currentPage)
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
  const { count } = getPosts(undefined)
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

export default function Page({
  posts,
  pages,
  currentPage,
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
}) {
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
