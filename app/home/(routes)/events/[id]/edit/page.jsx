'use client'
import React, { useState, useContext, useEffect } from 'react';
import usePatchEvent from '@/hooks/usePatchEvent';
import useEvent from '@/hooks/useEvent'
import Spinner from '@/app/components/Spinner';
import { toast } from 'react-toastify';
import { useRouter, notFound } from 'next/navigation';
import styles from '../../../../styles/Events.module.css';
import { AllEventCategories, eventTypes, locations } from '@/mockServer';
import SectionHeader from '@/app/home/components/SectionHeader';
import Loader from '@/app/components/Loader';

export default function page({ params }) {
    const { isLoading, patchEvent } = usePatchEvent();
    const { data, isPending, error } = useEvent(params.id);
    const [picturePreview, setPicturePreview] = useState(null);
    const [eventId, setEventId] = useState(null);
    
    useEffect(() => {
  
      if (error) {
          toast.error(error)
          notFound();
      }
  
      if (data) {
          Object.keys(data).forEach(key => {
              if (formData.hasOwnProperty(key)) {
                  setFormData(prevFormData => ({
                      ...prevFormData,
                      [key]: data[key]
                  }));
              }
          });
          setPicturePreview(data.picture)
          setEventId(data.id);
      }
    }, [data, error]);

    const { push } = useRouter();
    
    const [formData, setFormData] = useState({
        title: '',
        organizer: '',
        event_type: '',
        category: '',
        tags: [],
        location: '',
        virtual_url: '',
        date: '',
        time: '',
        event_picture: null,
        google_map_link: '',
        created_by: '',
    });


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: value.split(',').map((tag) => tag.trim()),
    }));
    console.log(formData)
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    const [date, time] = value.split('T');
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
      time
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicturePreview(null); 
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      event_picture: file,
    }));
  };
  
  const handleCategoryClick = (selectedCategory) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        category: selectedCategory,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    
    const tagsArray = Array.isArray(formData.tags) ? formData.tags : [];

    Object.entries(formData).forEach(([key, value]) => {
      
      if (key === 'tags') {
        formDataObj.append(key, JSON.stringify(tagsArray));
        console.log('tagsArray', tagsArray)
        console.log(formData)
      } else if (key === 'event_picture' && formData.event_picture === null){
        console.log('No picture')
      } else {
        formDataObj.append(key, value);
      }
    });

    patchEvent(formDataObj, eventId);
};

  const asterik = (
    <span className="text-red-700">*</span>
  )


  return (
    <div className={styles.eventFormWrapper}>
     <SectionHeader text="Update Event" />
      {eventId ? 
      <form onSubmit={handleSubmit}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputFirst}>
          <section>
            <div className={styles.formGroup}>
                <label>Title{asterik}</label>
                <input
                  required={true}
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                />
              </div>
            
            <div className={styles.formGroup}>
              <label>Event Type{asterik}</label>
                <select
                    required={true}
                    name="event_type"
                    value={formData.event_type || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Event Type</option>
                    {eventTypes.map((type) => (
                        <option key={type.name} value={type.name}>{type.displayName}</option>
                    ))}
                </select>
            </div>
          </section>

          <section>
          <div className={styles.formGroup}>
            <label>Location{formData.event_type !== 'virtual' && asterik}</label>
                <input 
                    list="location" 
                    name="location" 
                    required={formData.event_type !== 'virtual'}
                    autoComplete="off" 
                    value={formData.location || ''}
                    onChange={handleChange}/>
                        <datalist id="location">
                            {locations.map((place, index) => (
                                <option key={index} value={place} />
                            ))}
                        </datalist>
            </div>

            <div className={styles.formGroup}>
              <label>Date{asterik}</label>
              <input
                required={true}
                type="datetime-local" 
                name="date_time"
                value={`${formData.date || ``}T${formData.time || ``}`}
                onChange={handleDateTimeChange}
              />
            </div>

          </section>

        </div>
          <div className={`${styles.formGroup} py-3`}>
            <label>Category (select one)</label>
            <div className={styles.inputCatwrapper}>
                {AllEventCategories.map((category) => (
                    <div
                        key={category.name}
                        className={`${styles.categoryOption} ${
                            formData.category === category.name ? styles.selectedCategory : ''
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                      <p>{category.displayName} </p>
                    </div>
                ))}
            </div>
          </div>

          <div className={styles.inputFirst}>
            <section>
              <div className={styles.formGroup}>
                <label>Virtual Meeting URL {formData.event_type === 'virtual' && asterik}</label>
                <input
                  type="text"
                  name="virtual_url"
                  value={formData.virtual_url || ''}
                  onChange={handleChange}
                  required={formData.event_type === 'virtual'}
                />
              </div>
            </section>
            <section>
                <div className={styles.formGroup}>
                <label>Google Map Link</label>
                <input
                  type="text"
                  name="google_map_link"
                  value={formData.google_map_link || ''}
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>

          <div className={styles.formGroup}>
          <label>Picture</label>
          {picturePreview && <img src={picturePreview} alt="Preview" className="w-full h-[300px] object-cover rounded-lg transition-all"/>}
            <input
              type="file"
              name="event_picture"
              placeholder='Drag and drop or click to upload an image'
              accept="image/*"
              onChange={handlePictureChange}
            />
          </div>

          <button type="submit" disabled={isLoading} className={`w-full p-3 ${isLoading ? 'bg-gray-700' : 'bg-red-900'} text-white rounded hover:scale-[1.02] justify-center transition font-bold flex items-center gap-2`}>{ isLoading ? <>Loading... <Loader /></> : 'Submit' }</button>
        </div>
      </form>
      : <Spinner type="" />}
    </div>
  );
}
