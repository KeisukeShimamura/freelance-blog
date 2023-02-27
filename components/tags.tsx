import Link from 'next/link'
import React from 'react'
import { Tag } from '../types/post'

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <section className="mt-8">
      <h2 className="border-b border-primary font-bold mb-4">タグ</h2>
      <div className="flex flex-row gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.path}
            href={`/tag/${tag.path}`}
            className="border border-primary text-primary text-sm font-bold px-3 py-2 rounded hover:bg-primary hover:text-white"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Tags
