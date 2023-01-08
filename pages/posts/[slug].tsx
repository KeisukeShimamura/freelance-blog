import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Matter, Post } from '../../types/post'
import fs from 'fs'
import matter from 'gray-matter'

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const file = fs.readFileSync(`posts/${context.params?.slug}.md`, 'utf-8')
  const { data, content } = matter(file)
  const post = {
    matter: data as Matter,
    slug: context.params?.slug,
    content,
  } as Post
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('posts')
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

const Post = ({ post }: { post: Post }) => {
  return (
    <>
      <main>
        <h1>{post.matter.title}</h1>
        <p>{post.content}</p>
      </main>
    </>
  )
}

export default Post
