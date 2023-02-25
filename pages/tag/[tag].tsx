import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'
import Layout from '../../components/layout'
import Pagination from '../../components/pagination'
import PostItemCard from '../../components/post-item-card'
import { getPosts, getTags } from '../../lib/post'
import { Post, Tag } from '../../types/post'
import { NextPageWithLayout } from '../_app'

const PAGE_SIZE = 10

export const getStaticProps: GetStaticProps<{
  posts: Post[]
  pages: number[]
  tag: Tag
}> = (context) => {
  let tag = {
    name: '',
    path: context.params?.tag,
  } as Tag
  const { posts, count } = getPosts(undefined, `${tag.path}`, PAGE_SIZE, 1)
  const pages = Array.from(new Array(Math.ceil(count / PAGE_SIZE)))
    .map((v, i) => i + 1)
    .map((i) => {
      return i
    })
  tag.name = posts[0].frontMatter.tags.find((t) => t.path === tag.path)
    ?.name as string

  return {
    props: {
      posts,
      pages,
      tag,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const tags = getTags()
  let paths: any[] = []
  tags.map((tag) => {
    paths.push({
      params: {
        tag: tag.path,
      },
    })
  })
  return {
    paths,
    fallback: false,
  }
}

const TagHome: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts, pages, tag }: { posts: Post[]; pages: number[]; tag: Tag }) => {
  return (
    <>
      <NextSeo
        title={tag.name}
        description={`${tag.name}の記事一覧ページにです。`}
      />
      <section>
        <h1 className="border-b border-[#9DC8C8] mb-8 pb-4 font-bold text-lg">
          {tag.name}
        </h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <PostItemCard post={post} key={post.slug} />
          ))}
        </div>
        <Pagination pages={pages} currentPage={1} tag={tag.path} />
      </section>
    </>
  )
}

TagHome.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default TagHome
