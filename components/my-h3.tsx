import React, { ReactNode } from 'react'

const MyH3 = ({ children, id }: { children: ReactNode; id: string }) => {
  return (
    <h3 id={id} className="border-l-4 border-indigo-500 pl-2 ml-2">
      {children}
    </h3>
  )
}

export default MyH3
