import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { ReactElement } from 'react'
import { Post } from '../../types/post'
import PostItemCard from '../../components/post-item-card'
import { getCategories, getPosts } from '../../lib/post'
import Pagination from '../../components/pagination'
import { NextSeo } from 'next-seo'
import { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  category: string
  categoryName: string
}> = (context) => {
  const category = context.params?.category as string
  const { posts, count } = getPosts(`${category}`, PAGE_SIZE, 1)
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  const categoryName = posts[0].frontMatter.category[1]

  return {
    props: {
      posts,
      pages,
      category,
      categoryName,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getCategories()
  let paths: any[] = []
  categories.map((category) => {
    paths.push({
      params: {
        category,
      },
    })
  })
  return {
    paths,
    fallback: false,
  }
}

const Category: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
  posts,
  pages,
  category,
  categoryName,
}: {
  posts: Post[]
  pages: number[]
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
        <Pagination pages={pages} currentPage={1} category={category} />
      </section>
    </>
  )
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Category
