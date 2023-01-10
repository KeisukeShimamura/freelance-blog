import fs from 'fs'
import matter from 'gray-matter'
import { Matter, Post } from '../types/post'

export const getPosts = (path: string) => {
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

  return sortedPosts
}

export const getPost = (path: string, fileName: string) => {
  const slug = fileName.replace(/\.md$/, '')
  const file = fs.readFileSync(`${path}/${fileName}`, 'utf-8')
  const { data, content } = matter(file)
  data.category = path.split('/')[1]
  return {
    matter: data as Matter,
    slug,
    content,
  }
}
