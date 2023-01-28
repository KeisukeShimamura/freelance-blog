import { GetStaticProps } from 'next'
import { Post } from '../types/post'
import { getPosts } from '../lib/post'
import PostItemCardList from '../components/post-item-card-list'
import { useState } from 'react'
import classNames from 'classnames'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  const { posts } = getPosts('posts', 3, 1)

  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts }: { posts: Post[] }) {
  const [tabIndex, setTabIndex] = useState<number>(1)

  const clickTab = (index: number) => {
    setTabIndex(index)
  }

  return (
    <>
      <PostItemCardList posts={posts} title={`新着記事`} subTitle={`NEWS`} />
      <PostItemCardList
        posts={posts}
        title={`人気の記事`}
        subTitle={`PUPULAR`}
      />
      <div className="text-sm font-medium text-center text-gray-200 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="w-1/3">
            <a
              href="#"
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 1
                  ? 'text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(1)}
            >
              フリーランスエンジニア
            </a>
          </li>
          <li className="w-1/3">
            <a
              href="#"
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 2
                  ? 'text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(2)}
            >
              プログラミング
            </a>
          </li>
          <li className="w-1/3">
            <a
              href="#"
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 3
                  ? 'text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(3)}
            >
              北海道フリーランス生活
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
