import Admin from "./Admin"

export const metadata = {
  title: 'Admin | Amebo Connect',
  description: 'Administrator Dashboard',
}

export default function AdminLayout({ children }) {
  return (
      <Admin>
        { children }
      </Admin>
    )
}
