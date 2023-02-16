import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const PostItemCassette = ({ post }: { post: Post }) => {
  return (
    <Link
      key={post.slug}
      href={`/category/${post.frontMatter.category}/${post.slug}`}
    >
      <div className="pt-8 sm:flex">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
          <Image
            src={`/${post.frontMatter.image}`}
            width={200}
            height={100}
            alt={post.frontMatter.title}
            className="w-full rounded-md h-none object-cover sm:h-44"
          />
        </div>
        <div className="space-y-1">
          <p className="text-gray-400 ml-auto">
            <ArrowPathIcon className="w-4 h-4 inline-block mr-2" />
            {post.frontMatter.updatedAt}
          </p>
          <div className="space-x-2">
            {post.frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-500 text-white font-bold px-2 py-0.5 text-sm rounded-lg inline-block"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg font-bold text-gray-900 group-hover:text-gray-500">
            {post.frontMatter.title}
          </p>
          <p className="text-gray-500 line-clamp-3">
            {post.frontMatter.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCassette
