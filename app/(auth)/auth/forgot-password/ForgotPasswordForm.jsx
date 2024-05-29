'use client'
import React, { useState } from 'react';
import { sendVerificationCode } from '../resetPasswordService';

export default function ForgotPasswordForm() {

   const { isLoading, sendCode } = sendVerificationCode();

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendCode(formData);
  };

  return (
      <form className="auth_form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Input Your Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required={true}
            placeholder='example@gmail.com'
          />
        </div>
        <button className='auth_btn' style={isLoading ? { cursor: "wait", background: "#8a8a8a" } : { cursor: "pointer" }}>
          {isLoading ? 'Loading...' : 'Send Verification Link'}
        </button>
      </form>
  );
}