import { GetStaticPaths, GetStaticProps } from 'next'
import React, { createElement, Fragment } from 'react'
import { FrontMatter, Post } from '../../../types/post'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { getPost, getPosts } from '../../../lib/post'
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
import { visit } from 'unist-util-visit'
import remarkGfm from 'remark-gfm'

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const { frontMatter, content } = getPost(
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
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(customCode)
    .process(content)

  const post = {
    frontMatter: frontMatter as FrontMatter,
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
  const { posts } = getPosts('posts')
  const paths = posts.map((post) => ({
    params: {
      category: post.frontMatter.category,
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
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        a: (props: any) => <MyLink {...props} />,
        //img: (props: any) => <MyImage {...props} />,
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
        title={post.frontMatter.title}
        description={post.frontMatter.description}
        openGraph={{
          type: 'website',
          url: `http://localhost:3000/posts/${post.slug}`,
          title: post.frontMatter.title,
          description: post.frontMatter.description,
          images: [
            {
              url: `https://localhost:3000/${post.frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: post.frontMatter.title,
            },
          ],
        }}
      />
      <div className="prose prose-lg max-w-none">
        <div className="border">
          <Image
            src={`/${post.frontMatter.image}`}
            width={1200}
            height={700}
            alt={post.frontMatter.title}
          />
        </div>
        <h1 className="mt-12">{post.frontMatter.title}</h1>
        <span>{post.frontMatter.date}</span>
        <div className="space-x-2">
          <Link href={`/category/${post.frontMatter.category}/page/1`}>
            {post.frontMatter.category}
          </Link>
        </div>
        <div className="space-x-2">
          タグ
          {post.frontMatter.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {toReactNode(post.content)}
      </div>
    </>
  )
}

export default Post
