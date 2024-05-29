import moment from 'moment'
import React from 'react'

export default function GroupMsg({msg, user}) {
  return (
    <div className={`w-full flex ${user.id === msg.sender? 'justify-end' : 'justify-start'}`}>
        <div className={`mt-2 rounded-xl ${user.id === msg.sender? 'rounded-br-none bg-green-200 text-green-900' : 'bg-gray-300 text-gray-800 rounded-bl-none'} p-2 `}>
            <h5 className='text-sm font-semibold'>{msg.display_name === user.display_name ? 'You' :  msg.display_name}</h5>

            <p className='text-sm'>{msg.message}</p>
            <p className='text-[0.6em] text-right'>{moment(msg.timestamp).format('hh:mm a')}</p>
        </div>
    </div>
  )
}
