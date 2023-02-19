import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Post } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getCategories, getPosts } from '../../../../lib/post'
import Pagination from '../../../../components/pagination'
import PostItemCassette from '../../../../components/post-item-cassette'
import BreadCrumbs from '../../../../components/breadcrumbs'
import { NextSeo } from 'next-seo'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = (context) => {
  const category = context.params?.category
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
        paths.push({
          params: {
            category,
            page: i.toString(),
          },
        })
      })
  })
  return {
    paths,
    fallback: false,
  }
}

const Category = ({
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
      <BreadCrumbs
        lists={[
          {
            title: 'ホーム',
            path: '/',
          },
          {
            title: categoryName,
            path: `/category/${category}/page/1`,
          },
        ]}
      />
      <section className="py-8">
        {posts.map((post) => (
          <div key={post.slug} className="my-6">
            <PostItemCassette post={post} />
          </div>
        ))}
        <Pagination
          pages={pages}
          category={posts[0].frontMatter.category}
          currentPage={currentPage}
        />
      </section>
    </>
  )
}

export default Category
