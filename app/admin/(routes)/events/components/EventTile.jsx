import React from 'react'
import styles from '../events.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { formatDateShort } from '@/utils/stringHelperFuncts'
import { FiMapPin } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { BsPeople } from "react-icons/bs";

export default function EventTile({event}) {
  return (
    <Link href={`/admin/events/${event?.id}`}>
      <div className={styles.eventTile}>
        <Image height={200} width={270} src={event?.picture || 'https://placehold.co/600x400/png?text=Event+Image'} alt={event?.title || 'event title'} />
        <div>
          <p className={styles.eventDate}>{formatDateShort(event?.date)}</p>
          <p className="text-xl font-medium">
            {event.title.length > 24 ? event.title.slice(0, 24) + '...' : event.title}
          </p>
          <p className="flex gap-1 items-baseline text-sm mt-3"><FiMapPin /> 
            {event.location.length > 38 ? event.location.slice(0, 38) + '...' : event.location}
          </p>
          <div className='flex gap-1'>
              { event?.likes && <p className="flex gap-1 items-center text-sm"><FcLike /> {event?.likes} Likes  |</p> }
              <p className="flex gap-1 items-center text-sm">
                <BsPeople />
                {event?.attendees? 
                  `${event.attendees} Attendee${event.attendees > 1 ? 's' : ""}`
                  : 'No Attendee yet'}</p>
            </div>
        </div>
      </div>
    </Link>
  )
}