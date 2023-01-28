import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Post } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getCategories, getPosts } from '../../../../lib/post'
import Pagination from '../../../../components/pagination'
import PostItemCassette from '../../../../components/post-item-cassette'

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

  return {
    props: {
      posts,
      pages,
      currentPage,
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
}: {
  posts: Post[]
  pages: number[]
  currentPage: number
}) => {
  return (
    <>
      <section>
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
