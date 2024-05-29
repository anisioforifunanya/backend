'use client'
import {useState} from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';

export default function FaqSection({children, question}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='min-h-[60px] transition w-full rounded-xl bg-[#0000007c] text-white border-2 border-[#858585] flex justify-between p-3 faq-content'>
        <div>
            <h3 className='text-lg transition font-semibold'>{question}</h3>
            {isOpen && <div className='mt-3 animate-fade-down'>{children}</div>}
        </div>
        <button className='text-2xl flex' onClick={() => setIsOpen(prev => !prev)}>
            {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
    </div>
  )
}
