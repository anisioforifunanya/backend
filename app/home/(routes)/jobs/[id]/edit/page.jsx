'use client'
import React, { useState, useEffect } from 'react';
import Spinner from '@/app/components/Spinner';
import Loader from '@/app/components/Loader';
import { useRouter, notFound } from 'next/navigation';
import styles from '../../../../styles/Events.module.css';
import { jobTypes, employmentTypes, locations } from '@/mockServer';
import SectionHeader from '@/app/home/components/SectionHeader';
import { updateJob, fetchJob } from '@/services/jobsService';
import { toast } from 'react-toastify';


export default function page({ params }) {

  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() =>{
    fetchJob(params.id)
      .then(res => setData(res))
      .catch(()=>{
        notFound()
      })
  }, [])

  useEffect(() => {
    if (data) {
        Object.keys(data).forEach(key => {
            if (formData.hasOwnProperty(key)) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [key]: data[key]
                }));
            }
        });
    }
  }, [data]);

  const { push } = useRouter();
    

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

    setIsLoading(true);

    updateJob(params.id, formDataObj)
      .then(() => {
        toast.success('Job updated successfully');
        setIsLoading(false);
        push(`/home/jobs/${params.id}`);
      })
      .catch((error) => {
        toast.error('Network Error: Could not update job');
        setIsLoading(false);
        console.log(error);
      });
};

  const asterik = (
    <span className="text-red-700">*</span>
  )


  return (
    <div className={styles.eventFormWrapper}>
     <SectionHeader text="Update Job" />

     {data? <form onSubmit={handleSubmit}>
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
              <label>Location{asterik}</label>
              <input 
                list="location" 
                name="location" 
                required
                value={formData.location}
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

        <button type="submit" className={`w-full p-3 bg-red-900 text-white rounded hover:scale-[1.02] transition flex gap-2 items-center justify-center font-bold ${isLoading? "cursor-progress" : 'cursor-pointer'}`}>{isLoading? 'Loading': 'Submit'} {isLoading && <Loader />}</button>
        </div>
      </form>
      : <Spinner type="" /> }
    </div>
  );
}
