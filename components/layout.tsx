import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container my-6 flex flex-col md:flex-row">
        <div className="flex-1">{children}</div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
