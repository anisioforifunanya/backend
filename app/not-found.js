import Link from 'next/link'
import Logo from './components/Logo'
 
export default function NotFound() {
  return (
    <div className={`w-full h-[100vh] p-4 flex flex-col gap-3 items-center justify-center notfound_bg text-center`}>
      {/* <img src='/not_found.svg' alt='404 image' className='w-[170px] h-auto transition-all'/> */}
      <Logo color='text-white' />
      <p className='text-2xl font-semibold text-white'>Oops, this page does not exist !</p>
      <Link href="/">
        <button className='bg-red-500 rounded-lg transition-all text-white font-semibold p-3 hover:scale-105'>
          Return to the Landing Page
        </button>
      </Link>
    </div>
  )
}