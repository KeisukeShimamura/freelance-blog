import { GetStaticPaths, GetStaticProps } from 'next'
import React, { createElement, Fragment } from 'react'
import { Matter, Post } from '../../../types/post'
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
import MyLink from '../../../components/my-link'
import MyImage from '../../../components/my-image'
import Link from 'next/link'
import { visit } from 'unist-util-visit'
import { getPost, getPosts } from '../../../lib/post'

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const { matter, content } = getPost(
    `posts/${context.params?.category}`,
    `${context.params?.slug}.md`
  )

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
    matter: matter as Matter,
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
  const posts = getPosts('posts')
  const paths = posts.map((post) => ({
    params: {
      category: post.matter.category,
      slug: post.slug,
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
          <Link href={`/category/${post.matter.category}/page/1`}>
            {post.matter.category}
          </Link>
        </div>
        {toReactNode(post.content)}
      </div>
    </>
  )
}

export default Post
