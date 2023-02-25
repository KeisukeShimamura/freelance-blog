export type Post = {
  slug: string
  frontMatter: FrontMatter
  content: string
}

export type FrontMatter = {
  title: string
  createdAt: string
  updatedAt: string
  description: string
  image: string
  categoryString: string[]
  category: Category
  tagsString: string[][]
  tags: Tag[]
}

export type Category = {
  name: string
  path: string
  count?: number
}

export type Tag = {
  name: string
  path: string
  count?: number
}
