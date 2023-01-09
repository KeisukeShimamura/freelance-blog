import { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import { Matter, Post } from '../types/post'
import PostItemCard from '../components/post-item-card'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  const files = fs.readdirSync('posts')
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data, content } = matter(fileContent)
    return {
      matter: data as Matter,
      slug,
      content,
    }
  })

  const sortedPosts = posts.sort((post1, post2) =>
    new Date(post1.matter.date) > new Date(post2.matter.date) ? -1 : 1
  )
  return {
    props: {
      posts: sortedPosts,
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
