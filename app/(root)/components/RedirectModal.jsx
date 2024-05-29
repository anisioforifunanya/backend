import React from 'react'
import Modal from '@/app/components/Modal'
import { useRouter } from "next/navigation"


export default function RedirectModal({handleCloseModal, openModal, message}) {
    const { push } = useRouter();
  return (
    <Modal 
        className={'text-black'}
        onClose={handleCloseModal}
        isModalOpen={openModal} 
        title={'Hold On...'} 
        >
        <p className="mb-5 text-lg font-semibold">{message}</p>
        <div className="flex gap-2">
        <button 
            onClick={() => push('/login')} 
            className='p-3 rounded bg-[#ffbf00] font-semibold w-[48%]'>Login</button>
        <button 
            onClick={handleCloseModal} 
            className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Close</button>
        </div>
    </Modal>
  )
}
