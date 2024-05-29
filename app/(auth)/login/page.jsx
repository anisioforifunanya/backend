import React from 'react'
import LoginForm from './loginForm'
import { Suspense } from 'react'
export const metadata = {
  title: 'Login | Amebo Connect',
  description: 'Login to your Naija amebo Connect account',
}

export default function Login() {
  
  return (
    <>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className='login_redirect'><a href='/signup'>Don't have an account? Create one here!</a></p>
    </>
  )
}
