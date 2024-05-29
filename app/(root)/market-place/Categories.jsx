'use client'
import React from 'react';
import Link from 'next/link';

export default function Categories({ pathname, categoriesData }) {
    return (
        <aside className="categories">
            <ul>
               {categoriesData.map((category) => (
                    <li key={category.id}>
                        <Link href={`${pathname}?query=${category.slug}`}>
                            {category.name}
                        </Link>
                        <hr />
                    </li>
                ))}          
            </ul>
        </aside>
    );
}
