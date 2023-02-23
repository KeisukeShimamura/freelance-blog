import Link from 'next/link'
import React from 'react'
import {
  MagnifyingGlassIcon,
  Bars3BottomRightIcon,
} from '@heroicons/react/24/solid'

const Header = () => {
  return (
    <>
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={`/`}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </Link>
          <nav className="flex-1 float-right">
            <ul className="flex justify-end gap-5">
              <li className="p-2 cursor-pointer text-gray-400 hover:text-gray-900">
                <MagnifyingGlassIcon className="h-6 w-6 " />
              </li>
              <li className="p-2 cursor-pointer text-gray-400 hover:text-gray-900">
                <Bars3BottomRightIcon className="h-6 w-6" />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div>
        <div className="container mx-auto">
          <nav className="flex items-center text-xs sm:text-sm">
            <Link className="text-gray-400 hover:text-gray-900 pr-4" href={`/`}>
              ブログトップ
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-900 px-4 border-l-2 border-gray-300"
              href={`/about`}
            >
              プロフィール
            </Link>
            <Link
              className="text-gray-400 hover:text-gray-900 px-4 border-l-2 border-gray-300"
              href={`/contact`}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
