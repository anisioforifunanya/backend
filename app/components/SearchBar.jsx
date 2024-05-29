'use client'
import { useEffect, useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './styles/SearchBar.module.css';
  
export default function SearchBar({ size, placeholder, newRoute, fullWidth }) {

    const { replace, push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '');
      
      }, [pathname, searchParams]);
    

    const handleSearch = (query) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('query', query);
          } else {
            params.delete('query');
          }
        replace(`${newRoute? newRoute : pathname}?${params.toString()}`);
    };

    const handleKeyPress = (e) =>{
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    }

    const styleObj = {
        maxWidth: size === 'small' ? "400px" : "500px",
        width: fullWidth ? "100%" : "50%",
    }
    return (
        <div 
            className={styles.searchBar}
            style={styleObj}
        >
            <input
                type="search"
                placeholder={placeholder || 'Search for...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
            />
            <button className='text-xl' onClick={() => handleSearch(searchQuery)}> <LuSearch /> </button>
        </div>
    );
}
