'use client'
import { useEffect, useState, useContext, Suspense } from 'react'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { GoHome } from "react-icons/go";
import { BsPeople, BsBriefcase, BsCalendar2Check, BsCart3, BsChatLeftText } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AuthContext } from '@/context/authContext';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import SearchBar from '@/app/components/SearchBar';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  const sideBarIcons = (title) =>{
    switch (title) {
      case 'Home':
        return <GoHome size={'18px'}/>
      case 'People':
        return <BsPeople />
      case 'Market':
        return <BsCart3 />
      case 'Jobs':
        return <BsBriefcase />
      case 'Events':
        return <BsCalendar2Check />
      case 'Map':
        return <FiMapPin />
      case 'Messages':
        return <BsChatLeftText />
      default:
        return <GoHome />
    }
  }

  const homeLinks = [
    { title: 'Home', href: '/home'},
    { title: 'People', href: '/home/people'},
    { title: 'Market', href: '/home/market'},
    { title: 'Jobs', href: '/home/jobs'},
    { title: 'Events', href: '/home/events'},
    { title: 'Map', href: '/home/map'},
    { title: 'Messages', href: '/home/messages'},
  ];

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
   if(window){ 
    if (window.innerWidth < 820) {
      setIsMobile(true);
      } else {
      setIsMobile(false);
      }
    }
      console.log('ismobile', isMobile)
  }, [pathname])

  return (
   <>
   <div 
    className={`fixed bottom-5 bg-[#ff02028a] text-white backdrop-blur-sm right-5 p-3 border border-red-400 rounded shadow-lg sidebarBtn ${styles.sideBarBtn} hidden`}
    onClick={() => setIsMobile(prev => !prev)}
    >{isMobile ? <HiOutlineMenuAlt3 size={20} /> : <IoIosArrowBack size={20}/>}</div>
    {!isMobile && <aside className={styles.sidebarWrapper}>
          <Suspense>
            <div className={`w-full flex justify-center mt-8 ${styles.hideSearch} `}>
              <SearchBar size='small' placeholder={'Search people, posts...'} newRoute={'/home/search'} fullWidth={true}/>
            </div>
            </Suspense>
        <nav>
          <ul>
            {homeLinks.map(({title, href}) => (
              <li key={title}>
                <Link href={href} className={`${pathname === href ? 'text-[#ff3434bd]' : ''}`}>
                  {sideBarIcons(title)}
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {user?.user_type === 'admin' ? <Link href={'/admin'}>
          <button className='font-semibold p-2 rounded-lg w-full bg-red-100 hover:text-red-600 text-left transition flex gap-2 items-center'>
            <MdOutlineAdminPanelSettings  size={'18px'}/>
            Admin
          </button>
        </Link> : <div className='h-24'></div>}
      </aside>}
    </>
  )
}
