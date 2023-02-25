import Image from 'next/image'
import React, { ReactNode } from 'react'
import AboutMe from './about-me'
import Footer from './footer'
import Header from './header'
import Tags from './tags'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Image
        src={`/img/main_image.png`}
        alt={`メインイメージ`}
        width={1200}
        height={300}
        className="w-screen"
      />
      <div className="flex-1 container my-6 flex flex-col lg:flex-row">
        <main className="w-full lg:w-2/3">{children}</main>
        <aside className="w-full pl-0 mt-12 lg:mt-0 lg:pl-16 lg:w-1/3">
          <AboutMe />
          <Tags />
        </aside>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
