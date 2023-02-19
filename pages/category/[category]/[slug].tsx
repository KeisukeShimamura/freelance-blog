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
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import MyH2 from '../../../components/my-h2'
import MyH3 from '../../../components/my-h3'
import remarkFootnotes from 'remark-footnotes'
import MyStrong from '../../../components/my-strong'
import MyAttention from '../../../components/my-attention'
import BreadCrumbs from '../../../components/breadcrumbs'

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const { frontMatter, content } = getPost(`${context.params?.slug}.md`)

  const result = await unified()
    .use(remarkParse)
    .use(remarkFootnotes, { inlineNotes: false })
    .use(remarkPrism, {
      plugins: ['line-numbers'],
    })
    .use(remarkToc, {
      heading: '目次',
      tight: true,
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
  const { posts } = getPosts()
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
        h2: (props: any) => <MyH2 {...props} />,
        h3: (props: any) => <MyH3 {...props} />,
        strong: (props: any) => <MyStrong {...props} />,
        sub: (props: any) => <MyAttention {...props} />,
        //img: (props: any) => <MyImage {...props} />,
      },
    })
    .processSync(content).result
}

const customCode = () => {
  return (tree: any) => {
    let isNextToc = false
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' && node.properties.id === '目次') {
        node.properties = {
          className: ['hidden'],
        }
        isNextToc = true
      } else if (isNextToc) {
        // 目次
        node.properties = {
          className: ['list-none pl-0'],
        }
        node.children.map((li: any) => {
          if (li.tagName === 'li' && li.type === 'element') {
            li.children.map((ele: any) => {
              if (ele.tagName === 'a') {
                ele.properties = {
                  className: ['no-underline font-bold'],
                  href: ele.properties.href,
                }
                ele.children[0].value = '▼ ' + ele.children[0].value
              } else if (ele.tagName === 'ul') {
                // 2階層目
                ele.properties = {
                  className: ['list-none'],
                }
                ele.children.map((li: any) => {
                  if (li.tagName === 'li' && li.type === 'element') {
                    li.properties = {
                      className: ['border-b border-slate-400'],
                    }
                    li.children.map((a: any) => {
                      if (a.tagName === 'a') {
                        a.properties = {
                          className: ['no-underline'],
                          href: a.properties.href,
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        })
        node.children = [
          {
            type: 'element',
            tagName: 'summary',
            properties: {
              className: ['text-center'],
            },
            children: [{ type: 'text', value: '目次' }],
          },
          Object.assign({}, node),
        ]
        node.tagName = 'details'
        node.properties = {
          className: ['bg-[#F9FDFA] px-6 py-2 border rounded-lg'],
        }
        isNextToc = false
      } else if (
        node.tagName === 'section' &&
        node.properties.dataFootnotes === true
      ) {
        // 脚注
        node.children[0].children[0].value = '脚注'
      } else if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith('[alert]')) {
          // アラート
          node.tagName = 'sub'
          node.properties = {
            type: 'alert',
          }
          node.children[0].value = node.children[0].value.replace(
            /\[\/?alert\]/g,
            ''
          )
        } else if (node.children[0].value.startsWith('[check]')) {
          // チェック
          node.tagName = 'sub'
          node.properties = {
            type: 'check',
          }
          node.children[0].value = node.children[0].value.replace(
            /\[\/?check\]/g,
            ''
          )
        } else if (node.children[0].value.startsWith('[info]')) {
          // インフォ
          node.tagName = 'sub'
          node.properties = {
            type: 'info',
          }
          node.children[0].value = node.children[0].value.replace(
            /\[\/?info\]/g,
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
      <BreadCrumbs
        lists={[
          {
            title: 'ホーム',
            path: '/',
          },
          {
            title: post.frontMatter.categoryName,
            path: `/category/${post.frontMatter.category}/page/1`,
          },
          {
            title: post.frontMatter.title,
          },
        ]}
      />
      <div className="prose max-w-none py-8">
        <h1 className="mb-4">{post.frontMatter.title}</h1>
        <div className="flex space-x-6 text-sm text-slate-400 mb-4">
          <span>
            <PencilSquareIcon className="w-4 h-4 inline-block mr-2" />
            {post.frontMatter.createdAt}
          </span>
          <span>
            <ArrowPathIcon className="w-4 h-4 inline-block mr-2" />
            {post.frontMatter.updatedAt}
          </span>
        </div>
        <div className="space-x-2">
          {post.frontMatter.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-500 text-white font-bold px-2 py-0.5 text-sm rounded-lg inline-block"
            >
              {tag}
            </span>
          ))}
        </div>
        <Image
          className="my-4"
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
        />
        {toReactNode(post.content)}
      </div>
    </>
  )
}

export default Post
