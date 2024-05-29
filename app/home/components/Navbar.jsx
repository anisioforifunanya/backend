'use client'
import Logo from '@/app/components/Logo'
import UserButton from '@/app/components/UserButton'
import SearchBar from '@/app/components/SearchBar'
import styles from '../styles/Navbar.module.css'
import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import LogoResponsive from '@/app/components/LogoResponsive'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
        <LogoResponsive color='text-[#db1313]' route='home'/>
        <Suspense>
          <SearchBar size='small' placeholder={'Search people, posts...'} newRoute={'/home/search'}/>
        </Suspense>
        <UserButton />
    </header>
  )
}
