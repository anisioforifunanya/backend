import { useState, useEffect } from 'react'
import ProductTile from '../../market/components/ProductTile';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import { fetchProducts } from '@/services/storeService';

export default function ProductsActivity({userId, name}) {
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const { push } = useRouter();
  
    useEffect(() => {
      fetchProducts()
        .then(data => {
          setData(data.filter(product => product.posted_by === userId));
          setLoading(false);
        })
        .catch(error => setError(true))
      }, []);
  return (
    <div className='w-full flex flex-wrap justify-center gap-5'>
    { data.length > 0? 
        data.slice(0, 10).sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
            .map(product => ( 
            <ProductTile 
              product={product} 
              key={product?.id} 
              handleProductClick={()=> push(`/home/market/${product?.id}`)}/>
            ))
    : data.length === 0 && !loading? 
    <h2 className='w-full font-semibold text-xl text-center'>{name == "You" ? `You have` : `${name} has`} not listed any products yet!</h2>
    : !error? 
        <div className='flex justify-center items-center w-full h-[200px]'>
          <Spinner type=''/>
        </div>
    : <h2 className='items-center w-full text-2xl font-semibold'>An Error Occured!</h2>}
  </div>
  )
}
 