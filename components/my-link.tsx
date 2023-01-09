import Link from 'next/link'
import React, { ReactNode } from 'react'

const MyLink = ({ children, href }: { children: ReactNode; href: string }) => {
  const isMyPageLink =
    href.startsWith('/') || href.startsWith('#') || href === ''
  return isMyPageLink ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default MyLink
