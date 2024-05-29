import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo({size, color, route}) {
  return (
    <Link href={route === 'home'? '/home' : "/"}>
    <div className='homeLink'>
      <Image priority={true} height={50} width={50} src="/logo.png" alt='Amebo Connect Logo' />
      <h2 className={color || 'text-white'}>{size == "small" ? <span className='text-[0.8em] block'>Amebo<br />Connect</span> : "Amebo Connect"}</h2>
    </div>
  </Link>
  )
}
