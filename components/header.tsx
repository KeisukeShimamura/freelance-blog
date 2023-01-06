import Link from 'next/link'
import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <div className="flex items-center h-14 border-b container">
        <button className="p-2 mr-1">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <Link href="/">LOGO</Link>
      </div>
    </header>
  )
}

export default Header
