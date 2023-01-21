import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'

const PostItemCard = ({ post }: { post: Post }) => {
  // TODO format(new Date(post.matter.date), 'yyyy年MM月dd日')
  return (
    <Link href={`/category/${post.frontMatter.category}/${post.slug}`}>
      <div className="border rounded-lg shadow">
        <Image
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
        />
        <div className="p-4">
          <h2>{post.frontMatter.title}</h2>
          <p className="text-slate-500 text-sm">{post.frontMatter.date}</p>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCard
