import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'

const PostLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container my-6 max-w-[800px]">{children}</main>
      <Footer />
    </div>
  )
}

export default PostLayout
