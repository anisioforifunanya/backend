'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/app/components/MapComponent'), { ssr: false })

export default function Map() {
  return (
    <div>
      <MapComponent />
    </div>
  )
}
