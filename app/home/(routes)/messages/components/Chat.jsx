import moment from 'moment'
import { RiCheckDoubleFill, RiCheckFill } from "react-icons/ri"

export default function Chat({msg, user}) {
    const isUserMessage = msg.sender === user.id;

  return (
    <div className={`h-fit ${isUserMessage? 'justify-end' : 'justify-start'} w-full flex`}>
        <div className={`h-fit py-[6px] px-[10px] rounded-xl w-max-[300px] shadow-md mb-2 ${isUserMessage? 'bg-green-200 rounded-br-none' : 'border rounded-bl-none'}`}>
            <p className={`leading-tight text-sm ${isUserMessage? 'text-right' : 'text-left'}`}>{msg.message}</p>
            <div className={`flex ${!isUserMessage? 'justify-start' : 'justify-end'} items-center text-gray-500 gap-1 font-semibold`}>
                <p className='text-[0.56rem]'>{moment(msg.timestamp).format('hh:mm a')}</p>
                <p className='text-sm' >
                    {isUserMessage && (msg.is_read ? <RiCheckDoubleFill color='#0d65fc' /> : <RiCheckFill />)}
                </p>
            </div>
        </div>
    </div>
  )
}
