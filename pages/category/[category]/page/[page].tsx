import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Post } from '../../../../types/post'
import PostItemCard from '../../../../components/post-item-card'
import { getPosts } from '../../../../lib/post'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = (context) => {
  const category = context.params?.category
  const posts = getPosts(`posts/${category}`)

  return {
    props: {
      posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const categories = ['test', 'programing']
  const paths = categories.map((category) => ({
    params: {
      category,
      page: '1',
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

const Category = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostItemCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}

export default Category
