import React from 'react'
import Image from 'next/image'


export default function Loading() {
  return (
    <div id='preloader'>
        <Image priority={true} height={100} width={100} src="/logo.png" alt='Amebo Connect Logo'/>
        <h2>Loading...</h2>
    </div>
  )
}
