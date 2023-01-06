import Link from 'next/link'
import React, { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Sidebar from './sidebar'

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsSidebarOpen(false)
  }
  const openModal = () => {
    setIsSidebarOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-10">
        <div className="flex items-center h-14 border-b container">
          <button className="p-2 mr-1" onClick={openModal}>
            <Bars3Icon className="w-6 h-6" />
          </button>
          <Link href="/">LOGO</Link>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
    </>
  )
}

export default Header
