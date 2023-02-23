import React from 'react'

const AboutMe = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-24 pb-8 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="https://dummyimage.com/1200x500"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
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
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  マム
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-sm">
                  Next.js/Laravel/Python/フリーランス/ロードバイク/北海道札幌市在住
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-base mb-4">
                北海道札幌市を拠点にフリーランスエンジニアとしてシステム開発に携わっております。
                SIerにて5年半、自社サービス揮発会社にて4年ほど在籍して、フリーランスに転身しました。
                実際にフリーランスになった経験から得られるフリーランスで知っておくべきことや、エンジニアとして必要な知識などを執筆しております。
                また北海道在住のため、北海道でのテレワークや生活についての記事も執筆しております。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
