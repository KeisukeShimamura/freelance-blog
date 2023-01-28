import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'

const PostItemCard = ({ post }: { post: Post }) => {
  // TODO format(new Date(post.matter.date), 'yyyy年MM月dd日')
  return (
    <Link href={`/category/${post.frontMatter.category}/${post.slug}`}>
      <div className="relative">
        <Image
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
        />
        <span className="absolute right-2 -top-2 bg-yellow-500 px-3">
          {post.frontMatter.category}
        </span>
        <div className="p-4">
          <p className="text-slate-300 text-sm">{post.frontMatter.date}</p>
          <h3>{post.frontMatter.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCard
