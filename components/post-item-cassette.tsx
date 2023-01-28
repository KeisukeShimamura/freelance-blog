import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'

const PostItemCassette = ({ post }: { post: Post }) => {
  return (
    <Link href={`/category/${post.frontMatter.category}/${post.slug}`}>
      <div className="flex">
        <div className="w-1/3 md:w-1/5">
          <Image
            src={`/${post.frontMatter.image}`}
            width={200}
            height={100}
            alt={post.frontMatter.title}
          />
        </div>
        <div className="ml-4 w-2/3 md:w-4/5">
          {post.frontMatter.tags.map((tag) => (
            <span
              key={tag}
              className="bg-emerald-600 text-white font-bold mr-3 px-2 py-0.5 text-sm rounded-lg inline-block"
            >
              {tag}
            </span>
          ))}
          <h3 className="font-bold mt-1 line-clamp-1">
            {post.frontMatter.title}
          </h3>
          <p className="text-slate-300 text-sm">{post.frontMatter.date}</p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {post.frontMatter.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCassette
