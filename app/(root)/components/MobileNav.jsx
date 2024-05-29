import Logo from '@/app/components/Logo'
import React from 'react'
import Link from 'next/link'

export default function MobileNav({closeMenu}) {
  return (
    <div className='h-[100vh] w-[100vw] fixed top-0 left-0 pt-14 backdrop-blur-md bg-[#000000a8] z-50 overflow-y-auto'>
        <button onClick={closeMenu} className='absolute top-6 right-6 text-5xl text-white'>&times;</button>
        <nav className='flex h-full w-full justify-center p-6 flex-col gap-14 items-center'>
            <ul className='mobileNavLinks w-full text-xl flex flex-col justify-between items-center gap-5 text-center'>
                <li onClick={closeMenu}>
                    <Link href='/market-place'>
                        <span>Store</span>
                    </Link>
                </li>
                <hr className='w-[5%]' />
                <li onClick={closeMenu}>
                    <Link href='/people'>
                        <span>People</span>
                    </Link>
                </li>
                <hr className='w-[5%]' />
                <li onClick={closeMenu}>
                    <Link href='/jobs'>
                        <span>Jobs</span>
                    </Link>
                </li>
                <hr className='w-[5%]' />
                <li onClick={closeMenu}>
                    <Link href='/events'>
                        <span>Events</span>
                    </Link>
                </li>
                <hr className='w-[5%]' />
                <li onClick={closeMenu}>
                    <Link href='/map'>
                        <span>Map</span>
                    </Link>
                </li>
            </ul>
            <div className=' text-center w-full flex items-center flex-col gap-4'>
                <Link href={'/login'} className='py-1 px-4 block rounded-full bg-black border w-full border-white'>
                    Login
                </Link>
                <Link href={'/signup'} className='py-1 px-4 block rounded-full font-semibold w-full bg-white text-black'>
                    Signup
                </Link>
            </div>
        <span onClick={closeMenu}>
                <Logo />
            </span>
        </nav>
    </div>
  )
}
