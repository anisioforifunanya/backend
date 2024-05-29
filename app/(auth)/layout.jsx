'use client'
import './auth.css'
import { usePathname } from 'next/navigation'
import { Jost } from 'next/font/google'
import Logo from '../components/Logo';

const jost = Jost({ subsets: ['latin'] })

export default function DashLayout({ children }) {
  const pathname = usePathname()
  if (pathname !== "/auth/verification" && pathname !== '/auth/submit-request') {
    return(
      <div className={jost.className}>
        <div className="main">
          <Logo />
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${jost.className}`}>
          {children}
      </div>
    )
  }
}