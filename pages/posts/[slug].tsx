import { GetStaticPaths, GetStaticProps } from 'next'
import React, { createElement, Fragment } from 'react'
import { Matter, Post } from '../../types/post'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import remarkPrism from 'remark-prism'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import MyLink from '../../components/my-link'
import MyImage from '../../components/my-image'
import Link from 'next/link'
import { visit } from 'unist-util-visit'

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const file = fs.readFileSync(`posts/${context.params?.slug}.md`, 'utf-8')
  const { data, content } = matter(file)

  const result = await unified()
    .use(remarkParse)
    .use(remarkPrism, {
      plugins: ['line-numbers'],
    })
    .use(remarkToc, {
      heading: '目次',
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(customCode)
    .process(content)

  const post = {
    matter: data as Matter,
    slug: context.params?.slug,
    content: result.toString(),
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

const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink,
        img: MyImage,
      },
    })
    .processSync(content).result
}

const customCode = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith('[comment]')) {
          node.tagName = 'div'
          node.properties = {
            className: ['font-bold px-4 py-2 bg-orange-500 text-white'],
          }
          node.children[0].value = node.children[0].value.replace(
            /\[\/?comment\]/g,
            ''
          )
        }
      }
    })
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
      <div className="prose prose-lg max-w-none">
        <div className="border">
          <Image
            src={`/${post.matter.image}`}
            width={1200}
            height={700}
            alt={post.matter.title}
          />
        </div>
        <h1 className="mt-12">{post.matter.title}</h1>
        <span>{post.matter.date}</span>
        <div className="space-x-2">
          {post.matter.categories.map((category) => (
            <span key={category}>
              <Link href={`/category/${category}`}>{category}</Link>
            </span>
          ))}
        </div>
        {toReactNode(post.content)}
      </div>
    </>
  )
}

export default Post
