import Spinner from '@/app/components/Spinner'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
        <div className='p-3 h-full mb-6'>
            <h1 className="text-4xl font-semibold my-5 text-center leading-normal">Currently waiting for an admin <br/> to approve your request!</h1>
            <Spinner />
        </div>
        <p className='text-center font-semibold'>This process usually takes less than 24hrs</p>
        <div className='flex gap-[50px] items-center text-center mt-[70px]'>
          <Link href='/' className='transition underline hover:text-[#ffa11d]'>Home</Link>
          <Link href='/faqs' className='transition underline hover:text-[#ffa11d]'>FAQs</Link>
          <Link href='/people' className='transition underline hover:text-[#ffa11d]'>People</Link>
        </div>
    </>
  )
}
