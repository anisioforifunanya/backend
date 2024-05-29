'use client'
import EventSlider from "./EventSlider"
import UpcomingEvents from "./UpcomingEvents"
import { useRouter } from "next/navigation"
import useEvents from "@/hooks/useEvents"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import RedirectModal from "../components/RedirectModal"

export default function Map() {
  const { data, isPending, error } = useEvents();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const { push } = useRouter();

  useEffect(() => {
      if (error) {
        toast.error(error)
      }
  }, [error])

  useEffect(() => {
    if (localStorage.getItem('user')) {
    setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  const redirectUser = (id) => {
    if (!user) {
      setOpenModal(true)
      return
    }
    push(`/home/events/${id}`)
  }

    return (
      <main className=''>
       <RedirectModal 
        openModal = {openModal}
        message={'You need to be logged into your account to view and book events'}
        handleCloseModal={()=> setOpenModal(false)}/>
       <EventSlider handleClick={redirectUser} slides={data?.slice(0, 10)}/>
       <UpcomingEvents handleClick={redirectUser} slides={data} />
      </main>
    )
  }
  