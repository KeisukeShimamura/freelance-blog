import React from 'react'
import { Breadcrumb } from '../types/breadcrumb'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const BreadCrumbs = ({ lists }: { lists: Breadcrumb[] }) => {
  return (
    <ol
      className="flex overflow-x-auto whitespace-nowrap"
      aria-label="breadcrumb"
    >
      {lists.map(({ title, path }, index) => (
        <li className="flex items-center" key={index}>
          {lists.length - 1 !== index ? (
            <>
              <Link
                className="text-gray-500 text-sm md:text-base"
                href={path as string}
              >
                {title}
              </Link>
              <ChevronRightIcon
                aria-hidden="true"
                className="w-4 h-4 text-gray-500 mx-2"
              />
            </>
          ) : (
            <span
              className="text-gray-500 text-sm md:text-base"
              aria-current="page"
            >
              {title}
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

export default BreadCrumbs
