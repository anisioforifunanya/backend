import React from 'react'

export default function ({className, textClass, clearSearch}) {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
        <img src="/noresults.svg" alt="error" className={className} />
        <h1 className={`text-xl font-bold ${textClass || ''}`}>No results found!</h1>
        {clearSearch && 
          <button 
            onClick={()=> clearSearch()}
            className='p-2 text-white bg-red-500 font-semibold rounded-md'>
            Clear Search
          </button>
        }
    </div>
  )
}
