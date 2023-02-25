import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Post } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getCategories, getPosts } from '../../../../lib/post'
import Pagination from '../../../../components/pagination'
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

export default Category
