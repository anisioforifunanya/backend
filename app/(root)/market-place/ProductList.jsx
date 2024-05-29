'use client'
import { useState, useEffect } from 'react';
import styles from './store.module.css';
import ProductTile from '@/app/home/(routes)/market/components/ProductTile';
import { search } from '@/services/peopleService';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import Error from '@/app/components/Error';
import NoResults from '@/app/components/NoResults';

export default function ProductList({ products, handleProductClick }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [results, setResults] = useState(products)
    const { push } = useRouter()
    useEffect(() => {
        if(searchParams.get('query')){
            setLoading(true)
            setResults(null)
            search('store', searchParams.get('query'))
                .then(res =>{
                    if(res !== 'error'){
                        setResults(res)
                    } else {
                        setError(true)
                    }
                }).finally(()=> setLoading(false));
        } else {
            setResults(products)
        }
      }, [pathname, searchParams])
    return (
        <div className={styles.productWrapper}>
            <h2 className='text-3xl pb-3 font-semibold'>Featured Deals</h2>
            <div className={styles.productList}>
                {results?.map((product) => (
                    <ProductTile key={product.id} product={product} handleProductClick={handleProductClick} />
                ))}
                {loading && <Spinner centered={true} />}
                {error && <Error className={'w-[150px] h-auto mt-[50px]'} textClass={'text-white'} />}
                {results?.length === 0 && <NoResults className={'w-[150px] h-auto mt-[50px]'} textClass={'text-white'} clearSearch={()=> push(pathname)}/>}
            </div>
        </div>
    );
}
