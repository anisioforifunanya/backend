import React from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import { Suspense } from 'react'

export const metadata = {
  title: 'Reset Password | Amebo Connect',
}

export default function ResetPassword() {
  return (
    <>
       <h2 className='pb-8 text-2xl font-bold'>Reset Your Password</h2>
       <Suspense>
          <ResetPasswordForm />
       </Suspense>
    </>
  )
}
