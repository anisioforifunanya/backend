'use client'
import React, { useEffect, useState, useContext } from 'react'
import { search } from '@/services/peopleService'
import Spinner from '@/app/components/Spinner'
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import ProductTile from '../../market/components/ProductTile';
import Error from '@/app/components/Error'
import NoResults from '@/app/components/NoResults';

export default function ProductsSearch({query}) {
    const { user: authUser } = useContext(AuthContext);
    const { push } = useRouter();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)

    useEffect(() => {
     if(authUser) {
        setLoading(true)
        setProducts(null)
        search("store", query)
          .then(data => {
            if(data === 'error'){
                setError(true)
            } else {
                setProducts(data)
            }
        }).finally(()=> setLoading(false))
      }}, [authUser, query])
  const redirectUser = (id) => {
     push(`/home/market/${id}`)
    }
  return (
    <div className='flex flex-col w-full items-center p-[15px] h-[calc(100vh-70px)] overflow-y-auto'>
        {products?.length > 0?
          <>
            <div className='flex gap-3 flex-wrap animate-fadeup justify-center w-full'>
                {products.map(product => (<ProductTile product={product} key={product.id} handleProductClick={()=> redirectUser(product.id)} />))}
            </div>
            <h2 className="text-center-font-semibold text-xl mt-[15px]">End of search results!</h2>
          </>
        : products?.length === 0? 
            <NoResults className={'w-[150px] h-auto'}/>
        : loading ?
            <Spinner centered />
        : error? <Error className={'w-[150px] h-auto'}/>
        : null}
    </div>
  )
}
