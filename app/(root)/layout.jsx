import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import "./styles.css"
import { Jost } from 'next/font/google'

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  title: 'Amebo Connect',
  description: 'Welcome to the #1 Upcoming Social app',
}

export default function RootLayout({ children }) {

  return (
    <div className={jost.className}>
      <div className="homebg">
        <Navbar />
          {children}
        <Footer />
      </div>
    </div>
  )
}
