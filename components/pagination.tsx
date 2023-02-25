import Link from 'next/link'
import React from 'react'

const Pagination = ({
  pages,
  category,
  tag,
  currentPage = 1,
}: {
  pages: number[]
  category?: string
  tag?: string
  currentPage: number
}) => {
  let baseUrl: string = '/'
  if (category !== undefined) {
    baseUrl += `category/${category}`
  } else if (tag !== undefined) {
    baseUrl += `tag/${tag}`
  }
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <Link
          key={page}
          href={page > 1 ? `${baseUrl}/page/${page}` : baseUrl}
          className={`px-4 py-2 border hover:bg-black hover:text-white ${
            currentPage === page && 'bg-black text-white'
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  )
}

export default Pagination
