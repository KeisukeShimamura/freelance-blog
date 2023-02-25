import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { ReactElement } from 'react'
import { Post } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getCategories, getPosts } from '../../../../lib/post'
import Pagination from '../../../../components/pagination'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../../../_app'
import Layout from '../../../../components/layout'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  currentPage: number
  category: string
  categoryName: string
}> = (context) => {
  const category = context.params?.category as string
  const currentPage = Number(context.params?.page)
  const { posts, count } = getPosts(`${category}`, PAGE_SIZE, currentPage)
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  const categoryName = posts[0].frontMatter.categoryName

  return {
    props: {
      posts,
      pages,
      currentPage,
      category,
      categoryName,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getCategories()
  let paths: any[] = []
  categories.map((category) => {
    const { count } = getPosts(`${category}`)
    Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
      .map((v, i) => i + 1)
      .map((i) => {
        if (i > 1) {
          paths.push({
            params: {
              category,
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

const CategoryPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  posts,
  pages,
  currentPage,
  category,
  categoryName,
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
  category: string
  categoryName: string
}) => {
  return (
    <>
      <NextSeo
        title={categoryName}
        description={`${categoryName}の記事一覧ページにです。`}
      />
      <section>
        <h1 className="border-b border-[#9DC8C8] mb-8 pb-4 font-bold text-lg">
          {categoryName}
        </h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          category={category}
        />
      </section>
    </>
  )
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default CategoryPage
