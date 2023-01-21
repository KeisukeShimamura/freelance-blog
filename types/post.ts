export type Post = {
  slug: string
  frontMatter: FrontMatter
  content: string
}

export type FrontMatter = {
  title: string
  date: string
  description: string
  image: string
  category: string
  tags: string[]
}
