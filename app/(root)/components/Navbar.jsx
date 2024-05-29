'use client'
import { useState } from 'react'
import Link from 'next/link';
import MobileNav from './MobileNav';
import { BsPeople, BsBriefcase, BsCalendar2Check, BsCart3 } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Logo from '@/app/components/Logo';
import LogoResponsive from '@/app/components/LogoResponsive';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className='mainNav'>
        {menuOpen && <MobileNav closeMenu={()=> setMenuOpen(false)} />}
        <nav>
          {/* <Logo />           */}
          <LogoResponsive />
          <ul>
            <li>
              <Link href={'/market-place'}>
                <div>
                  <BsCart3  />
                  <span>Store</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/people'}>
                <div>
                  <BsPeople />
                  <span>People</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/jobs'}>
                <div>
                  <BsBriefcase  />
                  <span>Jobs</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/events'}>
                <div>
                  <BsCalendar2Check  />
                  <span>Events</span>
                </div>
              </Link>
            </li>
            {/* <li>
              <Link href={'/map'}>
                <div>
                  <FiMapPin />
                  <span>Map</span>
                </div>
              </Link>
            </li> */}
          </ul>
          <div className='authLinks'>
            <Link href={'/signup'}>Get Started</Link>
            <Link href={'/login'}>Login</Link>
          </div>
          <button onClick={()=> setMenuOpen(true)} className='menuBtn'><HiOutlineMenuAlt3 /></button>
        </nav>
    </header>
  )
}
