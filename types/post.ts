export type Post = {
  slug: string
  matter: Matter
  content: string
}

export type Matter = {
  title: string
  date: string
  description: string
  image: string
  categories: string[]
}
