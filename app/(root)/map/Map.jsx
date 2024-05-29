'use client'
import MapSideBar from "./MapSideBar"
import {homeLocationData} from "@/mockServer"
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/app/components/MapComponent'), { ssr: false })

export default function AdminMap() {
  return (
    <div className="root_map_wrapper">
        <MapSideBar locations={homeLocationData}/>
        <MapComponent />
    </div>
  )
}
