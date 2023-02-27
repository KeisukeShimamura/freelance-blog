import React, { ReactNode } from 'react'
import { Category, Tag } from '../types/post'
import Footer from './footer'
import Header from './header'

const PostLayout = ({
  children,
  tags,
  categories,
}: {
  children: ReactNode
  tags: Tag[]
  categories: Category[]
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container my-6 max-w-[800px]">{children}</main>
      <Footer tags={tags} categories={categories} />
    </div>
  )
}

export default PostLayout
