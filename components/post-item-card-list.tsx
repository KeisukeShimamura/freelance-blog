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
      <section className="text-gray-600 body-font">
        <div className="container px-2 pt-8 pb-16 mx-auto">
          <h2 className="text-2xl text-center">{title}</h2>
          <span className="text-sm text-gray-400 text-center block mb-4">
            {subTitle}
          </span>
          <div className="flex flex-wrap -m-4">
            {posts.map((post) => (
              <PostItemCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default PostItemCardList
