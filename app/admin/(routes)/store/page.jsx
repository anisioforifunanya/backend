'use client'
import { fetchProducts } from '@/services/storeService'
import Link from 'next/link'
import { eventCategoryIcons, snakeToTitle } from '@/utils/stringHelperFuncts'
import React, { useEffect, useState } from 'react'
import ProductTile from './components/ProductTile'
import Spinner from '@/app/components/Spinner'
import Error from '@/app/components/Error';
import SearchBar from '@/app/components/SearchBar';
import NoResults from '@/app/components/NoResults';
import { useRouter, useSearchParams } from 'next/navigation'

export default function page() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [results, setResults] = useState(null)
  const { push } = useRouter()
  const [notFound, setNotFound] = useState(false)
  const queryParams = useSearchParams()

  useEffect(()=>{
    fetchProducts().then((res)=>{
      if(res !== 'error'){
        setProducts(res)
      } else {
        setError(true)
      }
    }).finally(()=> setLoading(false))
  }, [])

  useEffect(() => {
    const query = queryParams.get('query');
    if(query && products){
      const filteredResults = products?.filter(product => { 
        return product.title.toLowerCase().includes(query.toLowerCase()) || product.location.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase()) 
      })
      
      if(filteredResults?.length > 0){
        setResults(filteredResults);
        setNotFound(false)
      } else {
        setNotFound(true)
        setResults([])
      }
    } else if(products){
      setNotFound(false)
      setResults(products)
    }
}, [queryParams, products])

  return (
    <div className='w-full p-3 overflow-y-auto'>
        <h2 className="text-2xl font-semibold">
          All Products
        </h2>
        <div className='w-full sticky top-5 z-30 flex justify-center'>
          <SearchBar placeholder={'Search products...'}  />
        </div>
        <div className='w-full my-[30px] px-[20px] md:px-[5px] flex flex-wrap gap-3'>
          {results?.map(item => <ProductTile key={item.id} product={item} handleProductClick={()=> push(`/admin/store/${item.id}`)}/>)}
          {loading && <Spinner centered />}
          {error && <Error className={'w-[150px] h-auto'}/>}
          {notFound && <NoResults className='w-[150px] h-auto' />}
      </div>
    </div>
  )
}
