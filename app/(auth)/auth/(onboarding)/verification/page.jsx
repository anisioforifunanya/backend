'use client'
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Spinner from '@/app/components/Spinner';
import Modal from '@/app/components/Modal';
import Loader from '@/app/components/Loader';
import { uploadVerifyPic } from '@/services/peopleService';
import Logo from '@/app/components/Logo';

export default function VerificationPage() {
  const videoRef = useRef();
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const { push } = useRouter();
  

  const startCamera = async () => {
    try {
      setIsVideoLoading(true);
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setShowModal(true);
        setIsVideoLoading(false);
      } else {
        console.error('Video ref is not available.');
        setIsVideoLoading(false);
      }
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        toast.info('Please allow camera permissions in your browser', { autoClose: 5000 });
      } else if (error.name === 'NotFoundError') {
        toast.info('No camera device found', { autoClose: 5000 });
      } else if (error.name === 'NotReadableError') {
        toast.info('The camera is already in use by another application or browser tab', { autoClose: 5000 });
      } else {
        toast.info('An error occurred while accessing the camera', { autoClose: 5000 });
      }
      setIsVideoLoading(false);
      setShowModal(false);
    }
  };

  const stopMediaStream = () =>{
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  useEffect(() => {

    if(!showModal) return;
    startCamera();

    return () => {
      stopMediaStream()
    };
  }, [showModal]);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob(blob => {
      setImageBlob(blob);
      setImage(URL.createObjectURL(blob));
      stopMediaStream();
      setShowModal(false);
    }, 'image/png');
  };

  const cancelImage = () => {
    stopMediaStream()
    setShowModal(false);
  };

  const submitImage = () => {
    const picFormData = new FormData();
    picFormData.append('picture', imageBlob)
    setLoading(true)
    uploadVerifyPic(picFormData)
      .then(res =>{
        if(res !== 'error'){
          toast.success('Verification picture uploaded successfully')
          localStorage.setItem('user', JSON.stringify({
            ...JSON.parse(localStorage.getItem('user')), 
            verifyPicUrl: res.url
          }))
          push('/auth/submit-request')
        }
      }).finally(()=> {
        setLoading(false)
      })
  }

  return (
    <main className="main">
      <Logo />
      <div className="w-full h-screen text-center items-center flex flex-col">
        <Modal
          onClose={()=> setShowConfirmation(false)}
          isModalOpen={showConfirmation}
          title='Confirm Verification Picture'
          className={'text-black text-left'}
        >
          <p className="font-semibold">Confirm your picture is clear and shows your full uncovered face. </p>
          
          <p className='text-red-600 font-semibold my-5'>You cannot change your verification picture once you've submitted</p>
          <div className="flex gap-2">
          <button 
              onClick={submitImage} 
              className={`p-3 rounded ${loading ? 'bg-[#545454] text-white' : 'bg-[#ffb700]'} font-semibold w-[48%] flex items-center justify-center gap-2`}>{loading? <>Loading <Loader /></>: 'Submit'}</button>
          <button 
              onClick={()=> setShowConfirmation(false)} 
              className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Back</button>
          </div>
        </Modal>
          <h1 className="text-center text-3xl font-semibold my-3">Facial Verification Module</h1>
          <p className="my-4 max-w-xl">
            Welcome to Amebo Connect! To maintain safety and deter scammers, we require you to complete your registration by uploading a <strong className='text-yellow-500'>clear photo of your face in good lighting </strong> and updating your <strong className='text-yellow-500'>personal details on the next page</strong>. <br /> Your submission will undergo screening. If deemed appropriate it will be approved within 24 hours.
          </p>

          <div className="mt-4">
            <img src={image || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Picture%20preview'} alt="picture preview" className={`max-w-xs max-h-80 rounded-lg object-cover w-full ${image ? 'scale-x-[-1]' : ''}`} />
          </div>

          <div className='my-5 flex justify-center gap-3 '>
          <button
              onClick={() => setShowModal(true)}
              className={`${image? 'bg-gray-600' : 'bg-blue-500'} hover:scale-105 text-white font-bold py-2 px-4 rounded`}
            >
              {image? 'Retake Photo' : 'Open Camera'}
            </button>

            {image && <button
              onClick={() => setShowConfirmation(true)}
              className={`bg-green-500 hover:scale-105 text-white font-bold py-2 px-4 rounded`}
            >
              Submit Photo
            </button>}

          </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-3xl max-w-[500px]">
              {isVideoLoading && <Spinner />}
              <video
                ref={videoRef}
                className={`${isVideoLoading && 'hidden'} w-full rounded-2xl border scale-x-[-1]`}
                autoPlay
                playsInline
                muted
                style={{ maxWidth: '100%' }}
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => captureImage()}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Snap
                </button>
                <button
                  onClick={cancelImage}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>);
};
