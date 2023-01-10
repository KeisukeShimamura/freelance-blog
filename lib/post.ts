import fs from 'fs'
import matter from 'gray-matter'
import { Matter, Post } from '../types/post'

export const getPosts = (
  path: string,
  pageSize?: number,
  currentPage?: number
) => {
  const dirs = fs.readdirSync(path, { withFileTypes: true })
  let posts: Post[] = []
  dirs.map((dir) => {
    if (dir.isFile()) {
      posts.push(getPost(path, dir.name))
    } else {
      const files = fs.readdirSync(`${path}/${dir.name}`, {
        withFileTypes: true,
      })
      files.map((file) => {
        posts.push(getPost(`${path}/${dir.name}`, file.name))
      })
    }
  })

  const sortedPosts = posts.sort((post1, post2) =>
    new Date(post1.matter.date) > new Date(post2.matter.date) ? -1 : 1
  )

  if (pageSize === undefined || currentPage === undefined) {
    return {
      posts: sortedPosts,
      count: posts.length,
    }
  }

  const slicedPosts = sortedPosts.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  )
  return {
    posts: slicedPosts,
    count: posts.length,
  }
}

export const getPost = (path: string, fileName: string) => {
  const slug = fileName.replace(/\.md$/, '')
  const file = fs.readFileSync(`${path}/${fileName}`, 'utf-8')
  const { data, content } = matter(file)
  data.category = path.split('/').length > 1 ? path.split('/')[1] : ''
  return {
    matter: data as Matter,
    slug,
    content,
  }
}

export const getCategories = (path: string) => {
  const dirs = fs.readdirSync(path, { withFileTypes: true })
  const categoris = dirs
    .map((dir) => {
      if (dir.isFile()) {
        return
      }
      return dir.name
    })
    .filter((e) => typeof e !== 'undefined')

  return categoris
}
