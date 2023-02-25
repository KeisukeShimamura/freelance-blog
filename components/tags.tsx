import Link from 'next/link'
import React from 'react'

const Tags = () => {
  const tags = [
    {
      name: 'Next.js',
      path: 'nextjs',
    },
    {
      name: '税金',
      path: 'tax',
    },
    { name: 'ブログ', path: 'blog' },
  ]

  return (
    <section className="mt-8">
      <h2 className="border-b border-[#9DC8C8] font-bold mb-4">タグ</h2>
      <div className="flex flex-row gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.path}
            href={`/tag/${tag.path}`}
            className="border border-[#9DC8C8] text-[#9DC8C8] text-sm font-bold px-3 py-2 rounded hover:bg-[#9DC8C8] hover:text-white"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Tags
