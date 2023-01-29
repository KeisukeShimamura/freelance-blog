import React, { ReactNode } from 'react'

const MyH3 = ({ children }: { children: ReactNode }) => {
  return <h3 className="border-l-4 border-emerald-600 pl-2 ml-2">{children}</h3>
}

export default MyH3
