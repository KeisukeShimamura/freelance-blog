import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { ReactElement } from 'react'
import { Category, Post, Tag } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getCategories, getPosts, getTags } from '../../../../lib/post'
import Pagination from '../../../../components/pagination'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../../../_app'
import Layout from '../../../../components/layout'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  currentPage: number
  tag: Tag
  tags: Tag[]
  categories: Category[]
}> = (context) => {
  let tag = {
    name: '',
    path: context.params?.tag,
  } as Tag
  const currentPage = Number(context.params?.page)
  const { posts, count } = getPosts(
    undefined,
    `${tag.path}`,
    PAGE_SIZE,
    currentPage
  )
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  tag.name = posts[0].frontMatter.tags.find((t) => t.path === tag.path)
    ?.name as string

  const tags = getTags()
  const categories = getCategories()
  return {
    props: {
      posts,
      pages,
      currentPage,
      tag,
      tags,
      categories,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const tags = getTags()
  let paths: any[] = []
  tags.map((tag) => {
    Array.from(new Array(Math.ceil((tag.count as number) / PAGE_SIZE)))
      .map((v, i) => i + 1)
      .map((i) => {
        if (i > 1) {
          paths.push({
            params: {
              tag: tag.path,
              page: i.toString(),
            },
          })
        }
      })
  })

  return {
    paths,
    fallback: false,
  }
}

const TagPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  posts,
  pages,
  currentPage,
  tag,
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
  tag: Tag
}) => {
  return (
    <>
      <NextSeo
        title={tag.name}
        description={`${tag.name}の記事一覧ページにです。`}
      />
      <section>
        <h1 className="border-b border-primary mb-8 pb-4 font-bold text-lg">
          {tag.name}
        </h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination pages={pages} currentPage={currentPage} tag={tag.path} />
      </section>
    </>
  )
}

TagPage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout tags={pageProps.tags} categories={pageProps.categories}>
      {page}
    </Layout>
  )
}

export default TagPage
