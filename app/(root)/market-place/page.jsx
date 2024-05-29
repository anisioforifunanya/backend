'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './store.module.css';
import { categoriesData } from './storeData';
import SearchBar from '../../components/SearchBar';
import Categories from './Categories';
import { fetchProducts } from '@/services/storeService';
import ProductList from './ProductList';
import {Suspense} from 'react';
import Spinner from '@/app/components/Spinner';
import Error from '@/app/components/Error';
import RedirectModal from '../components/RedirectModal';

export default function Store() {
    const { replace, push } = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')))
        }
      }, [])

    useEffect(()=>{
        fetchProducts().then((res)=>{
          if(res !== 'error'){
            setProducts(res)
          } else {
            setError(true)
          }
        }).finally(()=> setLoading(false))
      }, [])

    const checkUser = (productId) => {
        if (user){
            push(`/home/market/${productId}`)
            return
        }else{
            setOpenModal(true)
        }
    }
    

    return (
        <main className='flex flex-col items-center'>
            <RedirectModal 
                openModal = {openModal}
                message={'You need to be logged into your account to view and purchase this product'}
                handleCloseModal={()=> setOpenModal(false)}/>
            <h1 className='mt-[90px] mb-4 text-4xl text-center'>Market Place</h1>
            <Suspense>
              <SearchBar placeholder={'Search Products...'}/>
              <section className={styles.bottomPane}>
                {products && <>
                      <Categories pathname={pathname} categoriesData={categoriesData} />
                      <ProductList products={products} handleProductClick={checkUser} />
                  </>}
                  {loading && <Spinner centered />}
                  {error && <Error className={'w-[150px] h-auto'}/>}
              </section>
            </Suspense>
        </main>
    );
}