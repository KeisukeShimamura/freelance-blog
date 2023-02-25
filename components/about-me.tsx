import React from 'react'

const AboutMe = () => {
  return (
    <section className="">
      <h2 className="border-b border-[#9DC8C8] font-bold mb-4">プロフィール</h2>
      <div className="flex flex-col items-center gap-4 text-xs">
        <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <p>
          <span className="font-bold">マム</span> | フリーランスエンジニア
        </p>
        <p>
          北海道札幌市を拠点にフリーランスエンジニアとして生活してます。
          実際にフリーランスになった経験から得られるフリーランスで知っておくべきことや、エンジニアとして必要な知識などを執筆したり、
          北海道でのテレワークや生活についての記事も執筆してます。
        </p>
        <p>
          <a
            href="https://github.com/KeisukeShimamura"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:text-[#9DC8C8]"
          >
            GitHub
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/KeisukeShimamura"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:text-[#9DC8C8]"
          >
            Portfolio
          </a>
        </p>
      </div>
    </section>
  )
}

export default AboutMe
