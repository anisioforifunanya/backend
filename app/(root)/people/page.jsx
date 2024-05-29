'use client'
import { useState, useEffect} from 'react';
import RedirectModal from '../components/RedirectModal';
import { fetchUsers } from '@/services/peopleService';
import UserCard from '@/app/components/people/userCard';
import { toast } from 'react-toastify';
import Spinner from '@/app/components/Spinner';
import { useRouter } from 'next/navigation';

export default function People() {

  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null)
  const { push } = useRouter();

  useEffect(() => {
    if (localStorage.getItem('user')) {
    setUser(JSON.parse(localStorage.getItem('user')))
    }

    fetchUsers(true)
      .then(data => {
        if(data === 'error'){
          toast.error('Something went wrong!, Try again later!')
        } else {
          setUsers(data)
        }
      })
  }, []);

  const redirectUser = (id) => {
    if (!user) {
      setOpenModal(true)
      return
    }
    push(`/home/people/${id}`)
  }

    return (
      <main className=''>
        <RedirectModal 
          openModal = {openModal}
          message={'You need to be logged into your account to view and follow people'}
          handleCloseModal={()=> setOpenModal(false)}/>
        <h1 className='font-semibold text-2xl mt-3'>Popular</h1>
        <div className="flex gap-3 my-6 p-3 w-full overflow-x-auto">
          {users?.length > 0? 
            users.map(user => <UserCard user={user} handleClick={redirectUser} key={user.id}/>)
           : users && users.length == 0 ? 
              <h2 className='w-full text-white text-xl text-center'>There are no users yet!!</h2> : <Spinner centered={true} />}
        </div>
      </main>
    )
  }
  