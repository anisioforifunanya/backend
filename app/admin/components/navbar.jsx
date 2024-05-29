'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import UserButton from '@/app/components/UserButton';
import { routes } from '@/app/admin/components/routesData';

export default function Navbar() {
  const pathname = usePathname();

  let title = null

  for (const route of routes) {
    if (route.href === pathname) title = route.label;
  }

  if(pathname.startsWith('/admin/users/') && pathname !== '/admin/users/requests') title = 'User Details'
  if(pathname.startsWith('/admin/users/requests/')) title = 'Request Details'
  if(pathname.startsWith('/admin/events/')) title = 'Event Details'
  if(pathname.startsWith('/admin/jobs/')) title = 'Job Details'
  if(pathname.startsWith('/admin/store/')) title = 'Product Details'

  return (
    <header className='admin_navbar'>
      <h1 className='text-2xl font-medium pl-1'>{title === 'Requests'? 'Community Requests' : title}</h1>
      <UserButton />
    </header>
  )
}
