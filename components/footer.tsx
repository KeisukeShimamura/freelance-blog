import Link from 'next/link'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Footer = () => {
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
    <footer className="bg-gray-100">
      <div className="container">
        <div className="flex flex-col gap-8 mt-8 lg:flex-row">
          <div className="flex flex-col w-full gap-8 lg:w-1/3">
            <div>
              <h2 className="font-bold border-b border-[#9DC8C8] pb-2">
                カテゴリ
              </h2>
              <ul className="mt-3 text-sm">
                <li className="py-3 border-b border-gray-300">
                  ・
                  <Link
                    href={`/category/freelance`}
                    className="hover:text-[#9DC8C8]"
                  >
                    フリーランス
                  </Link>
                </li>
                <li className="py-3 border-b border-gray-300">
                  ・
                  <Link
                    href={`/category/programing`}
                    className="hover:text-[#9DC8C8]"
                  >
                    プログラミング
                  </Link>
                </li>
                <li className="py-3">
                  ・
                  <Link
                    href={`/category/hokkaido`}
                    className="hover:text-[#9DC8C8]"
                  >
                    北海道生活
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold border-b border-[#9DC8C8] pb-2">
                当ブログについて
              </h2>
              <ul className="mt-3 text-sm">
                <li className="py-3 border-b border-gray-300">
                  ・
                  <Link href={`/about`} className="hover:text-[#9DC8C8]">
                    当ブログについて
                  </Link>
                </li>
                <li className="py-3 border-b border-gray-300">
                  ・
                  <Link href={`/privacy`} className="hover:text-[#9DC8C8]">
                    プライバシーポリシー
                  </Link>
                </li>{' '}
                <li className="py-3">
                  ・
                  <Link href={`/contact`} className="hover:text-[#9DC8C8]">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="font-bold border-b border-[#9DC8C8] pb-2">
              タグ一覧
            </h2>
            <div className="flex flex-row gap-4 mt-4">
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
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="font-bold border-b border-[#9DC8C8] pb-2">検索</h2>
            <div className="mt-4 bg-white border border-gray-500 flex rounded items-center w-fit">
              <input
                type="text"
                name=""
                id=""
                placeholder="記事検索"
                className="ml-1"
              />
              <div className="px-1 cursor-pointer">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex border-t border-gray-300 my-8 pt-8 items-center">
          <p>© 2023 freelanceblog</p>
          <div className="flex-1 flex items-center gap-3 flex-row-reverse">
            <a
              href="https://github.com/KeisukeShimamura"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
