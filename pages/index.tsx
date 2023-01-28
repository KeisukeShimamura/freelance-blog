import { GetStaticProps } from 'next'
import { Post } from '../types/post'
import { getPosts } from '../lib/post'
import PostItemCardList from '../components/post-item-card-list'
import { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import PostItemCassette from '../components/post-item-cassette'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  const { posts } = getPosts(undefined, 3, 1)
  const { posts: freelancePosts } = getPosts('freelance', 5, 1)
  const { posts: programingPosts } = getPosts('programing', 5, 1)
  const { posts: hokkaidoPosts } = getPosts('hokkaido', 5, 1)
  return {
    props: {
      posts,
      freelancePosts,
      programingPosts,
      hokkaidoPosts,
    },
  }
}

export default function Home({
  posts,
  freelancePosts,
  programingPosts,
  hokkaidoPosts,
}: {
  posts: Post[]
  freelancePosts: Post[]
  programingPosts: Post[]
  hokkaidoPosts: Post[]
}) {
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
            <button
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 1
                  ? 'font-bold text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(1)}
            >
              フリーランスエンジニア
            </button>
          </li>
          <li className="w-1/3">
            <button
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 2
                  ? 'font-bold text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(2)}
            >
              プログラミング
            </button>
          </li>
          <li className="w-1/3">
            <button
              className={classNames(
                'w-full inline-block p-4 border-b-2 rounded-t-lg',
                tabIndex == 3
                  ? 'font-bold text-emerald-600 border-emerald-600 active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => clickTab(3)}
            >
              北海道フリーランス生活
            </button>
          </li>
        </ul>
      </div>
      {tabIndex == 1 && (
        <section>
          {freelancePosts.map((post) => (
            <div key={post.slug} className="my-6">
              <PostItemCassette post={post} />
            </div>
          ))}
          <div className="text-center mt-12">
            <Link
              href={`/category/freelance/page/1`}
              className="inline-block border-t-2 border-b-2 px-24 py-2 border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              もっと見る
            </Link>
          </div>
        </section>
      )}
      {tabIndex == 2 && (
        <section>
          {programingPosts.map((post) => (
            <div key={post.slug} className="my-6">
              <PostItemCassette post={post} />
            </div>
          ))}
          <div className="text-center mt-12">
            <Link
              href={`/category/programing/page/1`}
              className="inline-block border-t-2 border-b-2 px-24 py-2 border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              もっと見る
            </Link>
          </div>
        </section>
      )}
      {tabIndex == 3 && (
        <section>
          {hokkaidoPosts.map((post) => (
            <div key={post.slug} className="my-6">
              <PostItemCassette post={post} />
            </div>
          ))}
          <div className="text-center mt-12">
            <Link
              href={`/category/hokkaido/page/1`}
              className="inline-block border-t-2 border-b-2 px-24 py-2 border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              もっと見る
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
