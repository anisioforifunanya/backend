import React from 'react'
import useEvents from '@/hooks/useEvents';
import Spinner from '@/app/components/Spinner';
import EventTile from '../../events/components/EventTile';

export default function EventsActivity({userId, name}) {
    const { data, isPending, error } = useEvents();
    if (error) {
        toast.error(error)
      }
      console.log(data?.filter(item => item.created_by === userId ))
  return (
    <div>
         {data?.filter(item => item.created_by === userId ).length > 0?
            <div className='flex flex-wrap gap-3 justify-center py-5'>
                {data.filter(item => item.created_by === userId ).map(event => (
                    <EventTile key={event.id} event={event} />
                ))}
            </div>
        : data?.filter(item => item.created_by === userId ).length === 0?
            <h2 className='w-full font-semibold text-xl text-black text-center'>{name == "You" ? `You have` : `${name} has`} not created any events yet!</h2>
        : !error ?
            <div className='flex justify-center items-center w-full h-[200px]'>
                <Spinner type=''/>
            </div>
        : <h2 className='items-center w-full text-2xl font-semibold'>An Error Occured, Please try again later!</h2>
    }
    </div>
  )
}
