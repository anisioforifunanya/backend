'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, notFound } from 'next/navigation';
import Logo from '@/app/components/Logo'
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/authContext';
import { fetchUser, updateProfilePic, updateUser, updateCoverPic } from '@/services/peopleService';
import Spinner from '@/app/components/Spinner';
import Loader from '@/app/components/Loader';
import Error from '@/app/components/Error';
import Modal from '@/app/components/Modal';
import { locations } from '@/mockServer';

export default function page() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [socialMediaInputs, setSocialMediaInputs] = useState(['']);
  const [refetch, setRefetch] = useState(0);
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email_address: '',
    username: '',
    display_name: '',
    bio: '',
    address: '',
    gender: '',
    phone_number: '',
    birth_date: '',
    location: '',
    verify_pic_url: '',
    social_links: [],
    work_experience: '',
    profile_pic_url: ''
  });


  useEffect(() =>{
   if (user){
     fetchUser(user?.id)
      .then(res => setData(res))
      .catch(()=>{
        setError(true)
      })}
  }, [user, refetch])

  useEffect(() => {
    if (data) {
        Object.keys(data).forEach(key => {
            if (formData.hasOwnProperty(key)) {
              if(key === 'social_links'){

                setFormData(prevFormData => ({
                  ...prevFormData,
                  [key]: data[key] || [],
                }));

                setSocialMediaInputs(formData.social_links?.map(link => link.link));
                setSocialMediaInputs(prevInputs => [...prevInputs, '']);
              }
            else{
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [key]: data[key] || '',
                }));
            }}
        });
        console.log(formData)
    }
  }, [data, refetch]);

  const { push } = useRouter();


const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
        const updatedInputs = [...socialMediaInputs];
        updatedInputs[index] = value;
        setSocialMediaInputs(updatedInputs);
    } else {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    console.log(formData)
};

   
const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (value.length > 15) {
      toast.error('Username is too long');
      return;
    }
    if (/\s/.test(value) || /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      toast.error('Username cannot contain spaces or special symbols');
      return;
    }
    handleChange(e);
  };

const handleAddSocialMediaInput = (link) => {

    let socialMediaName = 'Other';
    if (link.slice(0, 4) !== 'http' && link.slice(0, 3) !== 'www') {
        link = `https://${link}`;
    }
    try{
      const url = new URL(link);
      const hostname = url.hostname.toLowerCase();
      if (hostname.includes('linkedin')) {
          socialMediaName = 'linkedin';
      } else if (hostname.includes('twitter')) {
          socialMediaName = 'twitter';
      } else if (hostname.includes('youtube')) {
        socialMediaName = 'youtube';
      } else if (hostname.includes('pinterest')) {
        socialMediaName = 'pinterest';
      } else if (hostname.includes('tiktok')) {
        socialMediaName = 'tiktok';
      } else if (hostname.includes('snapchat')) {
        socialMediaName = 'snapchat';
      } else if (hostname.includes('instagram')) {
          socialMediaName = 'instagram';
      } else if (hostname.includes('facebook')) {
          socialMediaName = 'facebook';
      } else{
        socialMediaName = hostname;
      }
    } catch (error) {
      toast.error(`Ensure you've added a valid URL`);
      return
    }

    setFormData(prevFormData => ({
        ...prevFormData,
        social_links: Array.isArray(prevFormData.social_links) ? [...prevFormData.social_links, { link: link, name: socialMediaName }] : [{ link: link, name: socialMediaName }],
    }));
    setSocialMediaInputs(prevInputs => [...prevInputs, '']);

};

const handleRemoveSocialMediaInput = (index) => {
    setSocialMediaInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
    setFormData(prevFormData => ({
        ...prevFormData,
        social_links: prevFormData.social_links.filter((_, i) => i !== index),
    }));
};

const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
       const picFormData = new FormData();
        picFormData.append('picture', file);
        const profilePicToast = toast.loading('Loading...');
        updateProfilePic(user?.id, picFormData)
        .then((res) =>{
          if(res == 'success'){
            toast.dismiss(profilePicToast);
            toast.success('Profile picture updated successfully!');
            setRefetch(refetch + 1);
            console.log(refetch)
          } else{
            toast.dismiss(profilePicToast);
          }
        })
    };
    reader.readAsDataURL(file);
}

const handleCoverPicChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onloadend = () => {
      const picFormData = new FormData();
      picFormData.append('picture', file);
      const otherPicToast = toast.loading('Loading...');
        updateCoverPic(user.id, picFormData)
        .then((res) =>{
          if(res == 'success'){
            toast.dismiss(otherPicToast);
            toast.success('Cover picture updated successfully!');
            setRefetch(refetch + 1);
            console.log(refetch)
          } else{
            toast.dismiss(otherPicToast);
          }
        })
  };
  reader.readAsDataURL(file);
}
  

const handleSubmit = (e) => {
  e.preventDefault();

  if(socialMediaInputs[socialMediaInputs.length - 1] === ''){
    socialMediaInputs.pop()
  } else{
    handleAddSocialMediaInput(socialMediaInputs[socialMediaInputs.length - 1])
  }
  const formDataObj = new FormData();

  const socialLinksJSON = JSON.stringify(formData.social_links);

  const coverPicsJSON = JSON.stringify(formData.other_pics);


  Object.entries(formData).forEach(([key, value]) => {
      if (key === 'social_links') {
          formDataObj.append(key, socialLinksJSON);
      } else if (key === 'other_pics') {
          formDataObj.append(key, coverPicsJSON);
      } else {
          formDataObj.append(key, value);
      }
});

  formDataObj.append('filled_all_info', true);

  setIsLoading(true);
  updateUser(user?.id, formDataObj)
      .then((res) => {
          if (res !== 'error') {
              toast.success('Request submitted successfully');
              localStorage.setItem('user', JSON.stringify({
                ...JSON.parse(localStorage.getItem('user')), 
                filledAllInfo: true
              }))
              push('/auth/waiting')
          }
          setIsLoading(false);
      });
};


  const asterik = <span className="text-red-300">*</span>
  
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  return (
    <div className="p-4 w-full main details_bg">
        <Logo />
        <h1 className="text-center text-3xl font-semibold my-3">Personal Details Page</h1>
        <p className="text-center">Fields marked with an asterik are required</p>
            {data ? (
              <div className='flex flex-wrap-reverse gap-[20px] justify-evenly py-[20px]'>
                <Modal
                     onClose={()=> setShowModal(false)}
                     isModalOpen={showModal}
                     title='Confirm Personal Details'
                     className={'text-black text-left'}
                >
                    <p className="font-semibold">Kindly confirm that all your details are correct before submitting!</p>
          
                    <p className='text-red-600 font-semibold my-5'>You will not be able to edit your information once you've submitted</p>
                    <div className="flex gap-2">
                    <button 
                        onClick={handleSubmit} 
                        className={`p-3 rounded ${isLoading ? 'bg-[#545454] text-white' : 'bg-[#ffb700]'} font-semibold w-[48%] flex items-center justify-center gap-2`}>{isLoading? <>Loading <Loader /></>: 'Submit Request'}</button>
                    <button 
                        onClick={()=> setShowModal(false)} 
                        className='p-3 text-white rounded bg-[#4b4b4b] font-semibold w-[48%]'>Back</button>
                    </div>
                </Modal>
                <div role='form' className="space-y-4 w-full w-min-[270px] max-w-[550px]">
                    <div className="space-y-2">
                        <div>
                            <label className="block font-semibold">
                                Display Name{asterik}
                            </label>
                            <input
                                type="text"
                                name="display_name"
                                value={formData.display_name}
                                required
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Username{asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleUsernameChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Email Address{asterik}
                            </label>
                            <input
                                type="email"
                                readOnly
                                name="email_address"
                                value={formData.email_address}
                                style={{color:'#888'}}
                                onChange={handleChange}
                                title="You can't change your email here"
                                className="w-full p-2 border rounded cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Location (State and Region){asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="location"
                                placeholder='e.g Lagos, Nigeria'
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                list='location'
                                autoComplete='off'
                            />
                            <datalist id="location">
                                {locations.map((place, index) => (
                                    <option key={index} value={place} />
                                ))}
                            </datalist>
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Whatsapp Phone Number{asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="phone_number"
                                value={formData.phone_number || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Gender
                            </label>
                            <div className="flex w-full items-center gender_fields_auth_details gap-6">
                                <label >
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        required
                                        checked={formData.gender === 'male'}
                                        value="male"
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </label>
                                <label>
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        required
                                        checked={formData.gender === 'female'}
                                        value="female"
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold">
                                Date of Birth (18 and above){asterik}
                            </label>
                            <input
                                type="date"
                                required
                                name="birth_date"
                                value={formData.birth_date  || ''}
                                onChange={handleChange}
                                max={minDate}
                                className="w-full p-2 border rounded"
                                />
                        </div>

                        <div>
                            <label className="block font-semibold">
                               Contact Address{asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                    <label className="block font-semibold">
                                Social media links
                      </label>
                      {socialMediaInputs?.map((input, index) => (
                              <div key={index} className="flex space-x-2 items-center">
                                  <input
                                      type="text"
                                      value={input || ''}
                                      onChange={(e) => handleChange(e, index)}
                                      placeholder="Twitter, Facebook, etc..."
                                      className="w-full p-2 border rounded"
                                  />
                                  {index === socialMediaInputs?.length - 1 && (
                                      <button
                                          type="button"
                                          onClick={() => handleAddSocialMediaInput(input)}
                                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                      >
                                          Add
                                      </button>
                                  )}
                                  {index !== socialMediaInputs?.length - 1 && (
                                      <button
                                          type="button"
                                          onClick={() => handleRemoveSocialMediaInput(index)}
                                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                      >
                                          Remove
                                      </button>
                                  )}
                              </div>
                          ))}

                        <div>
                            <label className="block font-semibold mb-3">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded h-20"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-3">
                                Work Experience
                            </label>
                            <textarea
                                name="work_experience"
                                value={formData.work_experience || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded h-20"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                name="input_pic"
                                id='input_pic'
                                onChange={handlePicChange}
                                className="w-full p-2 border rounded hidden"
                            />
                        </div>
                    </div>

                    {/* <div>
                        <label className="block font-semibold mb-3 text-center">
                            Cover Pictures (Select an image to change)
                        </label>
                        <div className='flex gap-2 flex-wrap justify-center'>
                          <label className=' basis-48'>
                              <input type="file" className='hidden' onChange={handleCoverPicChange}/>
                              <Image src={formData.other_pics[0] || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Cover%20Image%201'} alt="cover-pic" width={300} height={200} quality={80} style={{borderRadius:'12px', objectFit:'cover', height:'100%'}}/>
                          </label>
                          <label className=' basis-48'>
                              <input type="file" className='hidden' onChange={handleCoverPicChange}/>
                              <Image src={formData.other_pics[1] || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Cover%20Image%202'} alt="cover-pic" width={300} height={200} quality={80} style={{borderRadius:'12px', objectFit:'cover', height:'100%'}}/>
                          </label>
                          <label className=' basis-48'>
                              <input type="file" className='hidden' onChange={handleCoverPicChange}/>
                              <Image src={formData.other_pics[2] || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Cover%20Image%203'} alt="cover-pic" width={300} height={200} quality={80} style={{borderRadius:'12px', objectFit:'cover', height:'100%'}}/>
                          </label>
                          <label className=' basis-48'>
                              <input type="file" className='hidden' onChange={handleCoverPicChange}/>
                              <Image src={formData.other_pics[3] || 'https://placehold.co/600x400/EEE/31343C?font=raleway&text=Cover%20Image%204'} alt="cover-pic" width={300} height={200} quality={80} style={{borderRadius:'12px', objectFit:'cover', height:'100%'}}/>
                          </label>
                        </div>
                    </div> */}

                    {/* Submit Button */}
                    <button
                        onClick={() => {
                            if(!formData.address || !formData.username || !formData.display_name || !formData.gender || !formData.phone_number || !formData.birth_date || !formData.location || !formData.email_address ){

                                toast.error(`Please fill the required fields before submitting! :${!formData.birth_date? "Date of birth" : null}`)
                                console.log(formData)
                                return
                              }
                            setShowModal(true)
                        }}
                        className={`p-2 backdrop-blur-sm w-full mb-5 bottom-2 float-right text-white rounded hover:scale-[1.02] transition flex gap-2 items-center justify-center font-bold ${data?.filled_all_info ? 'cursor-not-allowed hover:bg-[#4e4e4eba] bg-[#7e7e7eba]' : 'cursor-pointer hover:bg-[#127936ba] bg-[#12793684]'}`}
                    >
                       {data?.filled_all_info? 'Already Submitted' : 'Submit Request'}
                    </button>
                </div>
                <div className=' flex-grow justify-center relative max-w-[300px]'>
                  <img 
                    src={formData.profile_pic_url || "/img/user.png"} alt="" 
                    className='w-[clamp(200px,20vw,350px)] h-[clamp(200px,20vw,350px)] object-cover mx-[15px] mt-0 mb-[20px] rounded-full border-2 border-gray-600 max-h-[300px] max-w-[300px]'/>
                    <label htmlFor='input_pic' className='p-3 m-2 absolute top-0 right-0 bg-[#0a3bff66] backdrop-blur-md transition rounded-2xl text-white'>Change pic</label>
                </div>
            </div>
            ) : !error? (
                    <div className='mt-6'>
                        <Spinner type="" />
                    </div>) : <Error className={'w-[150px] h-auto'} />}
        </div>
  );
}
