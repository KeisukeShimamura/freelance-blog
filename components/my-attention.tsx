import React, { ReactNode } from 'react'
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'

const MyAttention = ({
  children,
  type,
}: {
  children: ReactNode
  type: string
}) => {
  if (type == 'info') {
    return (
      <div className="flex items-center bg-blue-50 p-2 my-4">
        <InformationCircleIcon className="text-blue-600 mr-2 w-6 h-6" />
        <span className="flex-1">{children}</span>
      </div>
    )
  } else if (type == 'check') {
    return (
      <div className="flex items-center bg-yellow-50 p-2 my-4">
        <CheckCircleIcon className="text-yellow-600 mr-2 w-6 h-6" />
        <span className="flex-1">{children}</span>
      </div>
    )
  } else if (type == 'alert') {
    return (
      <div className="flex items-center bg-red-50 p-2 my-4">
        <ExclamationCircleIcon className="text-red-400 mr-2 w-6 h-6" />
        <span className="flex-1">{children}</span>
      </div>
    )
  }
  return <div>{children}</div>
}

export default MyAttention
