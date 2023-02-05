import Link from 'next/link'
import React, { ReactNode } from 'react'

const MyLink = ({
  children,
  href,
  className,
}: {
  children: ReactNode
  href: string
  className: string
}) => {
  const isMyPageLink =
    href.startsWith('/') || href.startsWith('#') || href === ''
  return isMyPageLink ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default MyLink
