import { GetStaticProps } from 'next'
import { Post } from '../types/post'
import { getPosts } from '../lib/post'
import PostItemCard from '../components/post-item-card'
import Pagination from '../components/pagination'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
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

export default function Home({
  posts,
  pages,
}: {
  posts: Post[]
  pages: number[]
}) {
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
