import fs from 'fs'
import matter from 'gray-matter'
import { Category, FrontMatter, Post } from '../types/post'

export const getPosts = (
  category?: string,
  pageSize?: number,
  currentPage?: number
) => {
  let posts: Post[] = []
  const files = fs.readdirSync('posts')
  files.map((file) => {
    posts.push(getPost(file))
  })

  posts = posts.sort((post1, post2) =>
    new Date(post1.frontMatter.createdAt) >
    new Date(post2.frontMatter.createdAt)
      ? -1
      : 1
  )

  if (category !== undefined) {
    posts = posts.filter((post) => {
      return post.frontMatter.category.path == category
    })
  }

  if (pageSize === undefined || currentPage === undefined) {
    return {
      posts: posts,
      count: posts.length,
    }
  }

  const slicedPosts = posts.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  )
  return {
    posts: slicedPosts,
    count: posts.length,
  }
}

export const getPost = (fileName: string) => {
  const slug = fileName.replace(/\.md$/, '')
  const file = fs.readFileSync(`posts/${fileName}`, 'utf-8')
  const { data, content } = matter(file)
  data.category = {
    name: data.categoryString[1],
    path: data.categoryString[0],
  } as Category
  return {
    frontMatter: data as FrontMatter,
    slug,
    content,
  }
}

export const getCategories = () => {
  let categories: Category[] = []
  const files = fs.readdirSync('posts')
  files.map((file) => {
    let post = getPost(file)
    let target = categories.find(
      (c) => c.path === post.frontMatter.category.path
    )
    if (target) {
      target.count = (target.count as number) + 1
    } else {
      categories.push({
        name: post.frontMatter.category.name,
        path: post.frontMatter.category.path,
        count: 1,
      })
    }
  })

  return categories
}

export const getPostCountByTag = () => {
  let postCounts: any = [
    {
      category: 'freelance',
      categoryName: 'フリーランスエンジニア',
      postCount: 0,
      postCountByTag: [],
    },
    {
      category: 'programing',
      categoryName: 'プログラミング',
      postCount: 0,
      postCountByTag: [],
    },
    {
      category: 'hokkaido',
      categoryName: '北海道フリーランス生活',
      postCount: 0,
      postCountByTag: [],
    },
  ]
  const files = fs.readdirSync('posts')
  files.map((file) => {
    let post = getPost(file)
    postCounts.map((postCount: any) => {
      if (post.frontMatter.category.path == postCount.category.path) {
        postCount.postCount += 1
        post.frontMatter.tags.map((tag) => {
          // TODO タグごとの件数を追加
        })
      }
    })
  })

  return postCounts
}
