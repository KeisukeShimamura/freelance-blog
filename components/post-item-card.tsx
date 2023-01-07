import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'

const PostItemCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="border rounded-lg shadow">
        <Image
          src={`/${post.matter.image}`}
          width={1200}
          height={700}
          alt={post.matter.title}
        />
        <div className="p-4">
          <h2>{post.matter.title}</h2>
          <p className="text-slate-500 text-sm">{post.matter.date}</p>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCard
