import Link from 'next/link'
import React from 'react'

const Pagination = ({
  pages,
  category,
  currentPage = 1,
}: {
  pages: number[]
  category?: string
  currentPage: number
}) => {
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <Link
          key={page}
          href={
            category
              ? page > 1
                ? `/category/${category}/page/${page}`
                : `/category/${category}`
              : page > 1
              ? `/page/${page}`
              : `/`
          }
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
