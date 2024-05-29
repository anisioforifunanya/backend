'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { randomHex, splitLocation, splitRadius } from '@/utils/stringHelperFuncts';

export default function MapComponent({locations, handleRebound}) {
    const mapRef = useRef();
    const markerRefs = useRef({});
    const [stopRebound, setStopRebound] = useState(false);
    const { push } = useRouter();


    useEffect(() => {
     if(locations?.length > 0) {  
        if (handleRebound) {
            setStopRebound(false);
        }
        if (!stopRebound) {
            if (mapRef.current && locations) {
                const bounds = locations.reduce((bounds, location) => {
                    const [lat, lng] = splitLocation(location.coordinates);
                    return bounds.extend([lat, lng]);
                }, new L.LatLngBounds());
                
                mapRef.current.fitBounds(bounds, {
                    padding: [50, 50],
                });
                setStopRebound(true)
            }
        }}
    }, [locations]);

    const renderIcon = (profile_pic) => {
        return L.divIcon({
            html: `<img src=${profile_pic || '/img/user.png'} class="w-[35px] h-[35px] rounded-full object-cover aspect-square border-2 border-red-600">`,
            iconSize: [35, 35],
            iconAnchor: [17.5, 17.5]
        });
    }

    return (
        <MapContainer ref={mapRef} center={[6.5568768 , 3.3488896]} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {locations?.map(user => (
                        <Marker 
                            key={user.id} 
                            position={splitLocation(user.coordinates)}
                            icon={renderIcon(user.profile_pic)}
                            ref={ref => (markerRefs.current[user.id] = ref)}
                            eventHandlers={{
                                click: ()=> push(`/home/people/${user.id}`),
                                mouseover: (event) => event.target.openPopup(),
                                mouseout: (event) => event.target.closePopup()
                            }}
                            >
                                <Popup offset={[0, -10]} className='font-semibold'>
                                    {user.display_name}
                                </Popup>
                                <Circle 
                                    color={`#${randomHex()}`}
                                    fillOpacity={0.2}
                                    opacity={0.3}
                                    center={splitLocation(user.coordinates)} radius={splitRadius(user.coordinates)} />
                        </Marker>
                    ))}
        </MapContainer>
    );
}