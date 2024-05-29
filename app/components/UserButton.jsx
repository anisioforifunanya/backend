'use client'
import {useState, useContext} from 'react'
import Image from 'next/image';
import { AuthContext } from '@/context/authContext';
import { capitalize } from '@/utils/stringHelperFuncts';
import { BsCaretDownFill } from "react-icons/bs";
import { VscBellDot, VscBell } from "react-icons/vsc";
import UserMenu from './UserMenu';


export default function UserButton() {
  const { user } = useContext(AuthContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  

  const showMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  }
  return (
    <div className='userBtn'>
      {user? <>
        <div >
          <p className='truncate max-w-[150px]'>{user.display_name}</p>
          <p>{capitalize(user.user_type)}</p>
        </div>

        <a href={`/home/people/${user.id}`}>
          <Image 
            height={60} 
            width={60} 
            src={user.profile_pic_url ? user.profile_pic_url : '/img/user.png'} 
            alt={user.display_name}/>
        </a>

        <div onClick={()=> showMenu()} className='user_btn_dropdown'>
          <BsCaretDownFill />
        </div>
      </> : null}
      {isMenuVisible && <UserMenu handleClose={showMenu} userId={user?.id} />}
    </div>
  )
}
