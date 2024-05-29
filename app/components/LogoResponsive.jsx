import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LogoResponsive({size, color, route}) {
  return (
    <Link href={route === 'home'? '/home' : "/"}>
    <div className='flex items-center gap-2'>
      <Image priority={true} height={40} width={40} src="/logo.png" alt='Amebo Connect Logo' className='object-cover w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]' />
      <h2 className={`${color || 'text-white'} md:text-lg text-sm font-semibold `}>Amebo Connect</h2>
    </div>
  </Link>
  )
}
