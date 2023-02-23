import { GetStaticProps } from 'next'
import { Post } from '../types/post'
import { getPosts } from '../lib/post'
import PostItemCardList from '../components/post-item-card-list'
import { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import PostItemCassette from '../components/post-item-cassette'
import Image from 'next/image'
import PostItemCard from '../components/post-item-card'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  const { posts } = getPosts(undefined, 10, 1)
  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <section>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
      </section>
    </>
  )
}
