import React from 'react'

export default function ({className, textClass, children}) {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
        <img src="/error.svg" alt="error" className={className} />
        <h1 className={`text-xl font-bold ${textClass}`}>Something went wrong!</h1>
        {children}
    </div>
  )
}
