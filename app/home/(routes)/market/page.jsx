'use client'
import { fetchProducts } from '@/services/storeService'
import Link from 'next/link'
import { StoreCatIcons, snakeToTitle } from '@/utils/stringHelperFuncts'
import React, { useEffect, useState } from 'react'
import ProductTile from './components/ProductTile'
import Spinner from '@/app/components/Spinner'
import Error from '@/app/components/Error'
import { useRouter } from 'next/navigation'
import { ProductCategories } from '@/mockServer'

export default function page() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { push } = useRouter()
 
  useEffect(()=>{
    fetchProducts().then((res)=>{
      if(res !== 'error'){
        setProducts(res)
      } else {
        setError(true)
      }
    }).finally(()=> setLoading(false))
  }, [])
  return (
    <div className='w-full p-3 overflow-y-auto'>
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-xl font-semibold">
          Top products
        </h2>
        <Link href="/home/market/create">
          <button className="bg-red-900 text-white px-3 py-2 font-semibold rounded hover:scale-105 transition">
            Add New!
          </button>
        </Link>
      </div>
      <div className='w-full mb-[30px] mt-[15px] overflow-y-auto p-[15px] rounded-[20px] rounded-b-[0px] border-gray-200 border flex gap-3'>
        {products?.slice(0, 4)?.map(item => <ProductTile key={item.id} product={item} handleProductClick={()=> push(`/home/market/${item.id}`)}/>)}
        {loading && <Spinner centered />}
        {error && <Error className={'w-[150px] h-auto'}/>}
      </div>
      <h2 className="text-2xl font-semibold">
          Categories
      </h2>
      <div className='overflow-x-auto rounded-xl border my-5'>
        <div className={'flex gap-2 justify-center flex-wrap w-[1200px] mx-auto h-[160px] p-2 '}>
            {ProductCategories.map((category, index) => (
              <Link className='h-0' key={index} href={`/home/search?query=${category}&type=products`}>
                  <p className="flex items-center gap-1 text-xs rounded-xl border border-red-800 w-[160px] h-[65px] text-center justify-center transition hover:text-white font-semibold hover:bg-red-800">
                    <span className="text-xl">
                      {StoreCatIcons(category)}
                    </span>
                    {snakeToTitle(category).replace(' ', '/')}
                  </p>
              </Link>
            ))}
          </div>
      </div>
        <h2 className="text-2xl font-semibold">
          All Products
        </h2>
        <div className='w-full my-[30px] px-[20px] md:px-[5px] flex flex-wrap gap-3'>
          {products?.map(item => <ProductTile key={item.id} product={item} handleProductClick={()=> push(`/home/market/${item.id}`)}/>)}
          {loading && <Spinner centered />}
          {error && <Error className={'w-[150px] h-auto'}/>}
      </div>
    </div>
  )
}
