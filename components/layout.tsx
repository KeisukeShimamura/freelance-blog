import React, { ReactNode } from 'react'
import AboutMe from './about-me'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container my-6">
        {children}
        <AboutMe />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
