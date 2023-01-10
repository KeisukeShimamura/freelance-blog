import { GetStaticProps } from 'next'
import { Post } from '../types/post'
import PostItemCard from '../components/post-item-card'
import { getPosts } from '../lib/post'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  const posts = getPosts('posts')

  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostItemCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
