import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Matter, Post } from '../../types/post'
import fs from 'fs'
import matter from 'gray-matter'
import PostItemCard from '../../components/post-item-card'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = (context) => {
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

  // カテゴリ内の記事のみ抽出して最新順にソート
  const category = context.params?.category
  const filteredPosts = posts.filter((post) => {
    return post.matter.categories.includes(category as string)
  })
  const sortedPosts = filteredPosts.sort((post1, post2) =>
    new Date(post1.matter.date) > new Date(post2.matter.date) ? -1 : 1
  )

  return {
    props: {
      posts: sortedPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const categories = ['test', 'programing', 'react']
  const paths = categories.map((category) => ({ params: { category } }))
  return {
    paths,
    fallback: false,
  }
}

const Category = ({ posts }: { posts: Post[] }) => {
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

export default Category
