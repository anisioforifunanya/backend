import React from 'react'
import SignupForm from './signupForm'

export const metadata = {
  title: 'Signup | Amebo Connect',
  description: 'Create your Amebo Connect account',
}

export default function Signup() {
  return (
    <>
      <h2 className='pb-8 text-2xl font-bold'>Create your Account!</h2>
      <SignupForm />
      <p className='login_redirect'>Already have an account? <br/> <a href='/login'>Login Instead</a></p>
    </>
    
  )
}
