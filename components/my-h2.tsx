import classNames from 'classnames'
import React, { ReactNode } from 'react'

const MyH2 = ({
  children,
  id,
  className,
}: {
  children: ReactNode
  id: string
  className: string
}) => {
  return (
    <h2
      id={id}
      className={classNames('border-b border-emerald-600 pl-2 pb-1', className)}
    >
      {children}
    </h2>
  )
}

export default MyH2
