import React from 'react'
import { Post } from '../types/post'
import PostItemCard from './post-item-card'

const PostItemCardList = ({
  posts,
  title,
  subTitle,
}: {
  posts: Post[]
  title: string
  subTitle: string
}) => {
  return (
    <>
      <section className="mb-12">
        <div className="text-center">
          <h2 className="text-xl">{title}</h2>
          <span className="text-xs text-slate-300">{subTitle}</span>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
          {posts.map((post) => (
            <PostItemCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}

export default PostItemCardList
