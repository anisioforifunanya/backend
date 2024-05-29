import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full p-4 flex flex-col gap-3 items-center justify-center'>
      <img src='/not_found.svg' alt='404 image' className='w-[170px] h-auto transition-all'/>
      <p className='text-2xl font-semibold'>Oops, this page does not exist !</p>
      <Link href="/home">
        <button className='bg-red-500 rounded-lg transition-all text-white font-semibold p-3 hover:scale-105'>
          Return Home
        </button>
      </Link>
    </div>
  )
}