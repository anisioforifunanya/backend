'use client'
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Loader from "@/app/components/Loader";
import { useRouter, usePathname } from 'next/navigation';
import useDeleteEvent from "@/hooks/useDeleteEvent";
import useDeleteJob from "@/hooks/useDeleteJob.";
import Modal from "@/app/components/Modal";
import { deleteProduct } from "@/services/storeService";
import { toast } from "react-toastify";

export default function SectionHeader({text, canUpdate, id, type}) {
    const { back, push } = useRouter();
    const pathname = usePathname()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading, deleteEvent, error } = useDeleteEvent();
    const { isLoading: isLoadingJob, deleteJob, error: errorJob } = useDeleteJob();
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleDelete = async () => {
      if(type === 'Job') {
        await deleteJob(id);

        if(!isLoadingJob && !errorJob) {
          setIsModalOpen(false)
        }
      } else  if(type === 'Product') {
        setIsLoadingProduct(true)
        deleteProduct(id).then((res) =>{
          if(res !== 'error'){
            toast.success("Product deleted successfully!");
            setIsModalOpen(false)
            push(`./`)
          }
          setIsLoadingProduct(false)
        })
      } else {
        await deleteEvent(id);

        if(!isLoading && !error) {
          setIsModalOpen(false)
        }
      }
    }

  return (
    <div className="flex justify-between items-center py-4">
        <h2 className="md:text-3xl text-xl font-semibold w-full mr-3">{text}</h2>
        <div className="flex gap-2 items-center text-black">
          {canUpdate &&
            (<>
                <button onClick={() => setIsModalOpen(true)} className="py-1 font-medium px-2 flex place-items-center rounded bg-red-200 text-red-800 hover:scale-110 transition"><RiDeleteBin6Line /> Delete</button>

                <Modal 
                  onClose={handleCloseModal} 
                  isModalOpen={isModalOpen} 
                  title={`Delete ${text} ${type? type : 'Event'}?`}> 
                  <p>This action cannot be undone!</p>
                   <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 mr-2 font-medium bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleCloseModal()}>Cancel</button>
                      <button 
                        className={`px-3 py-2 font-medium text-white rounded transition flex items-center gap-1 ${isLoading? "bg-slate-600" : "bg-red-600 hover:bg-red-800"}`} 
                        onClick={() => handleDelete()}>
                          {(isLoading || isLoadingJob || isLoadingProduct)? 'Loading' :'Delete'}
                          {(isLoading || isLoadingJob || isLoadingProduct) && <Loader />}
                    </button>
                    </div>
                </Modal>

                <button onClick={()=> push(`${pathname}/edit`)} className="py-1 font-medium px-2 flex place-items-center rounded bg-yellow-200 text-yellow-800 hover:scale-110 transition"><RiEdit2Line /> Update</button>
            </>)
          }
          <button onClick={()=> back()} className="py-1 font-medium px-2 flex place-items-center rounded border border-red-900 bg-white text-red-900 hover:scale-110 transition"><IoArrowBackOutline /> Back</button>
        </div>
    </div>
  )
}
