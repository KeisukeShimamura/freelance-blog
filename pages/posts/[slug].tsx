import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Matter, Post } from '../../types/post'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

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
      <NextSeo
        title={post.matter.title}
        description={post.matter.description}
        openGraph={{
          type: 'website',
          url: `http:localhost:3000/posts/${post.slug}`,
          title: post.matter.title,
          description: post.matter.description,
          images: [
            {
              url: `https://localhost:3000/${post.matter.image}`,
              width: 1200,
              height: 700,
              alt: post.matter.title,
            },
          ],
        }}
      />
      <main className="prose prose-lg max-w-none">
        <div className="border">
          <Image
            src={`/${post.matter.image}`}
            width={1200}
            height={700}
            alt={post.matter.title}
          />
        </div>
        <h1 className="mt-12">{post.matter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(post.content) }}></div>
      </main>
    </>
  )
}

export default Post
