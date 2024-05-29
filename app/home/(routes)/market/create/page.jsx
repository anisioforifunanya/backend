'use client'
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Events.module.css';
import { locations } from '@/mockServer';
import SectionHeader from '@/app/home/components/SectionHeader';
import Loader from '@/app/components/Loader';
import { snakeToTitle } from '@/utils/stringHelperFuncts';
import { createProduct } from '@/services/storeService';
import { toast } from 'react-toastify';

export default function page() {
   
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [picturePreview, setPicturePreview] = useState(null)

  const conditions = [ 'new', 'fairly_used' ]

  const categories = [ 'electronics', 'fashion', 'home_kitchen', 'health_beauty', 'toys_games', 'sports_outdoors', 'books', 'automotive', 'grocery', 'pet_supplies', 'tools', 'baby', 'handmade', 'software' ]

    
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    location: '',
    price: 0,
    picture_url: '',
    picture: null,
    phone_no: '',
    posted_by: '',
  });

  useEffect(() => {
    if (user){
      setFormData((prevFormData) => ({
        ...prevFormData,
        posted_by: user.id,
      }))
    }
  }, [user]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
    });
    setIsLoading(true);

    createProduct(formDataObj).then((res) => {
      if(res !== 'error') {
        toast.success('Product created successfully');
        push('/home/market');
      };
      setIsLoading(false);
    });
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
    picture: file,
  }));
};

  const asterik = (
    <span className="text-red-700">*</span>
  )


  return (
    <div className={styles.eventFormWrapper}>
     <SectionHeader text="List a new product" />
      <form onSubmit={handleSubmit}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputFirst}>
          <section>
            <div className={styles.formGroup}>
                <label>Product Title{asterik}</label>
                <input
                  required={true}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
              <label>Category{asterik}</label>
                <select
                    required={true}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>{snakeToTitle(item)}</option>
                    ))}
                </select>
            </div>
          </section>

          <section>
            <div className={styles.formGroup}>
              <label>Seller Location{formData.event_type !== 'virtual' && asterik}</label>
              <input 
                list="location" 
                name="location" 
                required={true}
                value={formData.location || ''}
                autoComplete="off" 
                placeholder='Start typing to see a list of locations or add a new one'
                onChange={handleChange}/>
                  <datalist id="location">
                    {locations.map((place, index) => (
                        <option key={index} value={place} />
                    ))}
                  </datalist>
            </div>
                <div className={styles.formGroup}>
                <label>Phone{asterik}</label>
                <input
                  required={true}
                  type="text"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                />
              </div>
          </section>
        </div>
        <div className={`${styles.formGroup} py-3`}>
          <label>Description{asterik}</label>
          <textarea
              required={true}
              name="description"
              value={formData.description}
              onChange={handleChange}
          />
        </div>

        <div className={`${styles.formGroup} py-3`}>
          <label>Condition{asterik}</label>
          <select
              required={true}
              name="condition"
              value={formData.condition}
              onChange={handleChange}
          >
              <option value="">Select</option>
              {conditions.map((item) => ( <option key={item} value={item}>{snakeToTitle(item)}</option>))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        
        <div className={styles.formGroup}>
          <label>Picture</label>
          {picturePreview && <img src={picturePreview} alt="Preview" className="w-full h-[300px] object-cover rounded-lg transition-all"/>}
            <input
              type="file"
              name="event_picture"
              accept="image/*"
              onChange={handlePictureChange}
            />
          </div>

        <button type="submit" className={`w-full p-3 bg-red-900 text-white rounded hover:scale-[1.02] transition font-bold flex justify-center gap-3 ${isLoading? "cursor-progress bg-gray-600" : 'cursor-pointer'}`}>{isLoading? 'Loading': 'Submit'} {isLoading && <Loader />}</button>
        </div>
      </form>
    </div>
  );
}
