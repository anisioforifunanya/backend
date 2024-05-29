import Home from "./Home"
export const metadata = {
  title: 'Home | Amebo Connect',
  description: 'The #1 Networking Platform',
}

export default function HomeLayout({ children }) {
    return (
       <Home>
          {children}
       </Home>
    )
  }
  