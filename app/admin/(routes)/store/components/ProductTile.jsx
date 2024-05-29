'use client'
import { formatCurrency } from '@/utils/stringHelperFuncts'
import React, { useState } from 'react'
export default function ProductTile({product, handleProductClick}) {

    const [hoveredProduct, setHoveredProduct] = useState(null)
  return (
    <div
        key={product.id}
        onClick={() => handleProductClick(product.id)}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
        className="w-[calc(25%-16px)] min-w-[200px] h-[220px] rounded-[10px] shadow-[0px_8px_10px_0px_#00000034] bg-white cursor-pointer transition-transform duration-300 hover:scale-[1.01] flex-grow text-black"
    >
        <div className="relative">
            <div
                className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000a7] rounded-[8px] text-white transition-opacity duration-300 ${
                hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <p className="border-[3px] border-white rounded-[20px] px-[10px] py-[5px]">
                Contact Buyer
                </p>
            </div>
            <img
                src={product.picture_url || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Product%20Image'}
                alt={product.title}
                className="w-full h-[130px] object-cover rounded-[10px] border border-gray-200"
            />
        </div>
        <div className="flex flex-wrap gap-[5px] mt-1 px-[8px] justify-between items-center">
            <h3 className="font-[600]">
                {product.title}
            </h3>
            <p className="text-[0.8em] font-[600] bg-[rgb(255,200,0)] rounded-[20px] h-fit px-2 py-0">
                {product.category}
            </p>
        </div>
        <div className="flex justify-between items-center text-[0.9em] px-[10px]">
            <p>{product.location}</p>
            <p className="text-[rgb(58,196,3)] font-[700] text-[1em]">
                ₦{formatCurrency(product.price)}
            </p>
        </div>
    </div>
  )
}
