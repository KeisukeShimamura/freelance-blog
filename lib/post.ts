import fs from 'fs'
import matter from 'gray-matter'
import { Category, FrontMatter, Post, Tag } from '../types/post'

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
  data.tags = data.tagsString.map((tagString: string[]) => {
    return {
      name: tagString[1],
      path: tagString[0],
    } as Tag
  })

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

export const getTags = () => {
  let tags: Tag[] = []
  const files = fs.readdirSync('posts')
  files.map((file) => {
    let post = getPost(file)
    post.frontMatter.tags.map((tag) => {
      let target = tags.find((t) => t.path === tag.path)
      if (target) {
        target.count = (target.count as number) + 1
      } else {
        tags.push({
          name: tag.name,
          path: tag.path,
          count: 1,
        })
      }
    })
  })

  return tags
}
