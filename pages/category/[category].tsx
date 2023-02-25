import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Post } from '../../types/post'
import PostItemCard from '../../components/post-item-card'
import { getCategories, getPosts } from '../../lib/post'
import Pagination from '../../components/pagination'
import BreadCrumbs from '../../components/breadcrumbs'
import { NextSeo } from 'next-seo'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = (context) => {
  const category = context.params?.category
  const { posts, count } = getPosts(`${category}`, PAGE_SIZE, 1)
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

const Category = ({
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
      <section>
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

export default Category
