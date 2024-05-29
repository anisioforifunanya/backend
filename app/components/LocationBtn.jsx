import { getLocation, updateUserLocation } from '@/services/mapService'
import { useEffect, useState} from 'react'
import Loader from './Loader'
import { toast } from 'react-toastify'

export default function LocationBtn({userId, handleRebound, rebound}) {

    const [status, setStatus] = useState('private')
    const [refetch, setRefetch]= useState(0)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
       getLocation(userId)
        .then(res => {
            if(res !== 'error'){
                if(res){
                    setStatus('public')
                } else{
                    setStatus('private')
                }
            }
        }).finally(()=> setIsLoading(false))
    }, [])

    useEffect(() =>{
        if(status === 'public') {
            handleShareLocation()
                .then((res)=>{
                    if(res !== 'error'){
                        setRefetch(prev => prev + 1)
                    }
                })
        } 
    }, [status, refetch])

    const handleShareLocation = async () => {
        toast.dismiss();
        if ("geolocation" in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude, accuracy } = position.coords;
                const coordinatesWithAccuracy = `${latitude},${longitude},${accuracy}`;
                await updateUserLocation(userId, coordinatesWithAccuracy);
            } catch (error) {
                if (error.code === error.PERMISSION_DENIED) {
                    toast.info(
                        "Please allow location permission to share your location.",
                        {
                            autoClose: false,
                            closeOnClick: true,
                            onclick: () => handleShareLocation(),
                        }
                    );
                }
                toast.error("Error getting user location:", error);
                setStatus('private');
                return 'error'
            }
        } else {
            toast.error("Geolocation is not supported on this device!");
            setStatus('private');
            return 'error'
        }
    };

    const stopSharing = async () =>{
        await updateUserLocation(userId, "")
        toast.dismiss();
    }

    const handleClick = () =>{
        if(status === 'private'){
            setIsLoading(true)
            setStatus('public')
            handleShareLocation()
            .then((res)=> {
                if(res !== 'error'){
                    setIsLoading(false)
                    handleRebound()
                    toast.success('Your location is now being shared!', {
                        autoClose: 4000
                    })
                }
            })
        } else{
            setIsLoading(true)
            setStatus('private')
            stopSharing().then(()=> {
                setIsLoading(false)
                setStatus('private')
                toast.success('Your Location is now private!', {
                    autoClose: 4000
                })
            })
        }
    }
  return (
    <button
        onClick={() => handleClick()}
        className={`p-2 ${(loading || rebound) ? 'bg-gray-600' : status === 'private' ? 'bg-red-500' : 'bg-blue-600'} flex items-center gap-2 text-white text-xs rounded-xl hover:scale-105 font-semibold transition`}
    >
        {!(loading || rebound) && (status === 'private' ? 'Start location share' : 'Stop location share')}
        {(loading || rebound) && <>Loading... <Loader /></>}
    </button>
  )
}
