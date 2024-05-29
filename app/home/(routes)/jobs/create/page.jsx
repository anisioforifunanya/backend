'use client'
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Events.module.css';
import useCreateJob from '@/hooks/useCreateJob';
import { locations } from '@/mockServer';
import SectionHeader from '@/app/home/components/SectionHeader';
import Loader from '@/app/components/Loader';

export default function page() {
   
  const { user } = useContext(AuthContext);
  const { isLoading, createJob } = useCreateJob();

  const { push } = useRouter();

  const jobTypes = [
    {
      'name': 'remote',
      'display': 'Remote'
    },
    {
      'name': 'onsite',
      'display': 'Onsite'
    },
    {
      'name': 'hybrid',
      'display': 'Hybrid'
    }
  ]
  const employmentTypes = [
    {
      'name' : 'internship',
      'display': 'Internship'
    }, 
    {
      'name': 'full_time',
      'display': 'Full Time'
    },
    {
      'name': 'part_time',
      'display': 'Part Time'
    },
    {
      'name': 'contract',
      'display': 'Contract'
    },
  ]

    
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    description: '',
    job_type: '',
    location: '',
    employment_type: '',
    apply_link: '',
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
    });

    createJob(formDataObj);
};

  const asterik = (
    <span className="text-red-700">*</span>
  )


  return (
    <div className={styles.eventFormWrapper}>
     <SectionHeader text="Add New Job" />
      <form onSubmit={handleSubmit}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputFirst}>
          <section>
            <div className={styles.formGroup}>
                <label>Company{asterik}</label>
                <input
                  required={true}
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

            <div className={styles.formGroup}>
                <label>Job Title{asterik}</label>
                <input
                  required={true}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
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
                onChange={handleChange}/>
                  <datalist id="location">
                    {locations.map((place, index) => (
                        <option key={index} value={place} />
                    ))}
                  </datalist>
            </div>

            <div className={styles.formGroup}>
              <label>Job Type{asterik}</label>
                <select
                    required={true}
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    {jobTypes.map(({name, display}) => (
                        <option key={name} value={name}>{display}</option>
                    ))}
                </select>
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
          <label>Employment Type{asterik}</label>
          <select
              required={true}
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
          >
              <option value="">Select</option>
              {employmentTypes.map(({name, display}) => (
                  <option key={name} value={name}>{display}</option>
              ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Apply Link</label>
          <input
            type="text"
            name="apply_link"
            value={formData.apply_link}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={`w-full p-3 bg-red-900 text-white rounded hover:scale-[1.02] transition font-bold ${isLoading? "cursor-progress" : 'cursor-pointer'}`}>{isLoading? 'Loading': 'Submit'} {isLoading && <Loader />}</button>
        </div>
      </form>
    </div>
  );
}
