import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
export const metadata = {
  title: 'Forgot Password | Amebo Connect',
}

export default function ForgotPassword() {
  return (
    <>
       <h2 className='pb-8 text-2xl font-bold'>Forgot Your Password?</h2>
       <p className='pb-5 font-medium'>We'll send a link to your email to reset your Password</p>
       <ForgotPasswordForm />
    </>
  )
}
