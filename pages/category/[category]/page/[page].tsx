import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { ReactElement } from 'react'
import { Category, Post } from '../../../../types/post'
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
  category: Category
}> = (context) => {
  let category = {
    name: '',
    path: context.params?.category,
  } as Category
  const currentPage = Number(context.params?.page)
  const { posts, count } = getPosts(
    `${category.path}`,
    undefined,
    PAGE_SIZE,
    currentPage
  )
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  category.name = posts[0].frontMatter.category.name

  return {
    props: {
      posts,
      pages,
      currentPage,
      category,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getCategories()
  let paths: any[] = []
  categories.map((category) => {
    Array.from(new Array(Math.ceil((category.count as number) / PAGE_SIZE)))
      .map((v, i) => i + 1)
      .map((i) => {
        if (i > 1) {
          paths.push({
            params: {
              category: category.path,
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
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
  category: Category
}) => {
  return (
    <>
      <NextSeo
        title={category.name}
        description={`${category.name}の記事一覧ページにです。`}
      />
      <section>
        <h1 className="border-b border-primary mb-8 pb-4 font-bold text-lg">
          {category.name}
        </h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          category={category.path}
        />
      </section>
    </>
  )
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default CategoryPage
