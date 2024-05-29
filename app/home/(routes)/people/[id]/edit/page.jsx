'use client'
import React, { useState, useEffect } from 'react';
import Spinner from '@/app/components/Spinner';
import Loader from '@/app/components/Loader';
import { useRouter, notFound } from 'next/navigation';
import SectionHeader from '@/app/home/components/SectionHeader';
import { toast } from 'react-toastify';
import { fetchUser, updateProfilePic, updateUser, updateCoverPic } from '@/services/peopleService';
import Image from 'next/image';
import { updateUserLocation } from '@/services/mapService';


export default function page({ params }) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialMediaInputs, setSocialMediaInputs] = useState(['']);
  const [refetch, setRefetch] = useState(0);
  const [formData, setFormData] = useState({
    email_address: '',
    username: '',
    display_name: '',
    bio: '',
    address: '',
    gender: '',
    phone_number: '',
    birth_date: '',
    coordinates: '',
    location: '',
    is_verified: '',
    verify_pic_url: '',
    social_links: [],
    work_experience: '',
    profile_pic_url: '',
    other_pics: [],
  });


  useEffect(() =>{
    fetchUser(params.id)
      .then(res => setData(res))
      .catch(()=>{
        notFound()
      })
  }, [params.id, refetch])

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
        updateProfilePic(params.id, picFormData)
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
        updateCoverPic(params.id, picFormData)
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

  console.log(formData)
  setIsLoading(true);

  updateUser(params.id, formDataObj)
      .then((res) => {
          if (res !== 'error') {
              toast.success('Profile updated successfully');
              push(`/home/people/${params.id}`);
          }
          setIsLoading(false);
      });
};


  const asterik = <span className="text-red-700">*</span>


  return (
    <div className="p-4 w-full overflow-x-auto">
            <SectionHeader text="Update Profile Information" />
            {data ? (
              <div className='flex flex-wrap-reverse justify-evenly py-[20px]'>
                <form onSubmit={handleSubmit} className="space-y-4 w-full w-min-[270px] max-w-[550px] pr-[15px]">
                    <h3 className="text-lg font-bold">Personal Information</h3>
                    <div className="space-y-2">
                        <div>
                            <label className="block font-semibold">
                                Display Name {asterik}
                            </label>
                            <input
                                type="text"
                                name="display_name"
                                value={formData.display_name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border mb-4 mt-1 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Username {asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-2 border mb-4 mt-1 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Email Address {asterik}
                            </label>
                            <input
                                type="email"
                                required
                                readOnly={true}
                                name="email_address"
                                value={formData.email_address}
                                title='Email address cannot be changed'
                                onChange={handleChange}
                                className="w-full p-2 border text-gray-600 focus:outline-none bg-gray-100 mt-1 mb-4 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Location (Country and State) {asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="location"
                                placeholder='e.g Lagos, Nigeria'
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border mb-4  mt-1 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Phone Number {asterik}
                            </label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number || ''}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border mt-1 mb-4 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Gender {asterik}
                            </label>
                            <div className="flex w-full items-center gap-6 mb-4">
                                <label  className='flex gap-4' >
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
                                <label className='flex gap-4' >
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
                                Date of Birth {asterik}
                            </label>
                            <input
                                type="date"
                                name="birth_date"
                                required
                                value={formData.birth_date  || ''}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 mt-1 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">
                               Contact Address {asterik}
                            </label>
                            <input
                                type="text"
                                required
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                className="w-full p-2 border mb-4 mt-1 rounded"
                            />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mt-4">Social Profile</h3>
                    <hr />
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
                                      placeholder="Enter social media link"
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
                            <label className="block font-semibold">
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
                            <label className="block font-semibold">
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

                    <div>
                        <label className="block font-semibold mb-3">
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
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`p-2 bg-[#12793684] backdrop-blur-sm w-full mb-5 bottom-2 float-right hover:bg-[#127936ba] text-white rounded hover:scale-[1.02] transition flex gap-2 items-center justify-center font-bold ${isLoading ? 'cursor-progress' : 'cursor-pointer'}`}
                    >
                        {isLoading ? 'Loading' : 'Save Changes'} {isLoading && <Loader />}
                    </button>
                </form>
                <div className=' flex-grow justify-center relative max-w-[300px]'>
                  <img 
                    src={formData.profile_pic_url || "/img/user.png"} alt="" 
                    className='w-[clamp(200px,20vw,350px)] h-[clamp(200px,20vw,350px)] object-cover mx-[15px] mt-0 mb-[20px] rounded-full border-2 border-gray-600 max-h-[300px] max-w-[300px]'/>
                    <label htmlFor='input_pic' className='p-3 m-2 absolute top-0 right-0 bg-[#0a3bff66] backdrop-blur-md transition rounded-2xl text-white'>Change pic</label>
                </div>
            </div>
            ) : (
                <Spinner type="" />
            )}
        </div>
  );
}
