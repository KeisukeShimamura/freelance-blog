import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Post } from '../types/post'
import {
  ArrowPathIcon,
  FolderIcon,
  PencilSquareIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

const PostItemCard = ({ post }: { post: Post }) => {
  return (
    <article className="sm:w-1/2 sm:px-2 mb-8">
      <div className="relative overflow-hidden">
        <Link href={`/${post.slug}`} className="">
          <Image
            src={`/${post.frontMatter.image}`}
            width={900}
            height={500}
            alt={post.frontMatter.title}
            className="w-full object-cover object-center hover:scale-125 ease-in duration-300"
          />
        </Link>
        <Link
          href={`/category/${post.frontMatter.category[0]}`}
          className="absolute bg-[#9DC8C8] text-white p-2 right-0 top-0 text-sm hover:opacity-90"
        >
          <FolderIcon className="w-5 h-5 inline-block mr-1" />
          <span>{post.frontMatter.category[1]}</span>
        </Link>
      </div>
      <div className="flex flex-wrap text-gray-400 gap-x-3 items-center text-sm mt-3">
        <p>
          <ArrowPathIcon className="w-4 h-4 inline-block mr-1" />
          {post.frontMatter.updatedAt}
        </p>
        <p>
          <PencilSquareIcon className="w-4 h-4 inline-block mr-1" />
          {post.frontMatter.createdAt}
        </p>
        <div className="flex items-center">
          <TagIcon className="w-4 h-4 inline-bolck mr-1" />
          {post.frontMatter.tags.map((tag, i) => (
            <Link
              href={`/tag/${tag[0]}`}
              key={tag[0]}
              className="hover:text-[#9DC8C8]"
            >
              {tag[1]}
            </Link>
          ))}
        </div>
      </div>
      <h2 className="text-gray-900 my-2 hover:text-[#9DC8C8]">
        <Link href={`/${post.slug}`} className="block">
          {post.frontMatter.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed mb-3 md:line-clamp-3 hidden md:block">
        {post.frontMatter.description}
      </p>
    </article>
  )
}

export default PostItemCard
