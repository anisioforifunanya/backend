'use client'
import React from 'react'



export default function MapSideBar({locations}) {
  return (
      <div className="root_map_sidebar">
        <h2>Nearby</h2>
        <ul>
            {locations?.map(({name, desc}, index) => (
                    <li key={index} className="map_location">
                        <h4>{name}</h4>
                        <p>{desc}</p>
                    </li>
                )
            )}
        </ul>
    </div>
  )
}
