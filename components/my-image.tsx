import Image from 'next/image'
import React from 'react'

const MyImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative max-w-full h-96">
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  )
}

export default MyImage
