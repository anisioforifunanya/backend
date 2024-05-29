'use client'
import { capitalize, formatDateShort } from '@/utils/stringHelperFuncts'

export default function UpcomingEvents({slides, handleClick}) {
  return (
    <div>
        <h2 className='p-[20px] text-2xl font-bold'>Upcoming Events</h2>
        <div className='upcomming_events_grid'>
            {slides?.map(item => (
                <div key={item.id} onClick={()=>handleClick(item.id)}>
                    <img src={item.picture || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Event%20Pic'} alt={item.title} height={400} width={600} />
                    <span 
                        className='font-bold absolute top-2 right-2 p-3 text-xl bg-red-700 text-white w-fit h-fit rounded-md'>
                            {formatDateShort(item.date)}
                    </span>
                    <div>
                        <div className='flex pt-[10px] justify-between'>
                            <p className='text-2xl flex font-bold leading-none flex-col'>
                                {item.title.length > 30 ? capitalize(item.title.slice(0, 29) + '...') : capitalize(item.title)} 
                                   
                                <span className='text-sm font-normal'>
                                    {item.location.length > 40 ? item.location.slice(0, 39) + '...' : item.location} 
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
