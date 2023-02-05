import React, { ReactNode } from 'react'

const MyStrong = ({ children }: { children: ReactNode }) => {
  return (
    <strong className="bg-gradient-to-b from-transparent via-transparent to-yellow-400">
      {children}
    </strong>
  )
}

export default MyStrong
