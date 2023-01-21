import Image from 'next/image'
import React from 'react'

const MyImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative max-w-full h-96">
      <Image src={src} alt={alt} width={1200} height={700} />
    </div>
  )
}

export default MyImage
