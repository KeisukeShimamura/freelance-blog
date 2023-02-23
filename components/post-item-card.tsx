import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const PostItemCard = ({ post }: { post: Post }) => {
  return (
    <Link
      key={post.slug}
      href={`/category/${post.frontMatter.category}/${post.slug}`}
      className="px-0 py-4 md:w-1/3 md:px-2"
    >
      <div className="h-full border-2 border-gray-400 border-opacity-60 rounded-lg overflow-hidden">
        <Image
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
          className="lg:h-48 md:h-36 w-full object-cover object-center"
        />
        <div className="p-6">
          <div className="flex gap-2">
            {post.frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className="tracking-widest text-sm font-medium text-white bg-indigo-500 px-2 py-1 rounded-xl"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-gray-900 my-3">
            {post.frontMatter.title}
          </h3>
          <p className="leading-relaxed mb-3 line-clamp-3">
            {post.frontMatter.description}
          </p>
          <div className="flex items-center flex-wrap">
            <div className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              もっと見る
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
            <p className="text-gray-400 ml-auto">
              <ArrowPathIcon className="w-4 h-4 inline-block mr-2" />
              {post.frontMatter.updatedAt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostItemCard
