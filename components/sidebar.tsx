import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <aside className="w-full mt-12 md:mt-0 md:w-1/3 md:ml-12 md:max-w-[300px]">
      <div className="">
        <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto"></div>
        <p className="text-xl font-bold my-3 text-center">マム</p>
        <p>
          Sierにて5年半、自社サービス会社にてシステム開発を4年間経験し、33歳でフリーランスに転身。現在は知り合いからの紹介で業務委託にてシステム開発をおこなっております。
          <br />
          Next.js/Laravel/Python/フリーランス/ロードバイク/北海道札幌市在住
        </p>
      </div>
      <div>
        <p>カテゴリ</p>
      </div>
    </aside>
  )
}

export default Sidebar
