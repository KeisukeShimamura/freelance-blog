import Link from 'next/link'
import React from 'react'

const links = [
  {
    label: 'ホーム',
    path: '/',
  },
  {
    label: '著者について',
    path: '/about',
  },
]
const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t py-10 mt-10">
      <div className="container">
        <div className="mb-6">
          <Link href="/">LOGO</Link>
        </div>
        <div>
          <h2 className="mb-3 text-slate-600">メニュー</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.path} className="hover:text-blue-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-slate-500">© 2022 freelance-blog.</p>
      </div>
    </footer>
  )
}

export default Footer
