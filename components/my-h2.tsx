import React, { ReactNode } from 'react'

const MyH2 = ({ children }: { children: ReactNode }) => {
  return <h2 className="border-b border-emerald-600 pl-2 pb-1">{children}</h2>
}

export default MyH2
