'use client'
import Logo from '@/app/components/Logo'
import Link from 'next/link'
import React from 'react'
import '../styles/sidebar.css'
import { usePathname } from 'next/navigation';
import { routes } from '@/app/admin/components/routesData';


export default function Sidebar({requestNum}) {
  const pathname = usePathname();

  return (
    <aside className='side_bar'>
      <Logo size="small"/>
      <nav>
        <ul>
          {routes.map(({ href, label }) => (
            <React.Fragment key={href}>
              <li>
                <Link href={href} className={`${pathname === href ? 'border-[#fffffff0] border shadow' : ''}`} >{label}{label === 'Requests' && requestNum > 0 && 
                <span className='text-xs font-semibold py-[3px] px-2 ml-[50%] rounded-full bg-red-600'>{requestNum}</span>}</Link>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </nav>
      <Link href="/home">
          <div className="sidebarHomeLink">Home</div>
      </Link>
    </aside>
  )
}
