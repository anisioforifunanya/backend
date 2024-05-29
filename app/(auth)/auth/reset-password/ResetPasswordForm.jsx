'use client'
import React from 'react'
import { useState } from 'react';
import { emailResetPassword } from '../resetPasswordService';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';


export default function ResetPasswordForm() {

  const {push} = useRouter();

  const queryParams = useSearchParams(); 

  const { isLoading, resetPassword } = emailResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    user_id: queryParams.get('id'),
    token: queryParams.get('token'),
    password: '',
    confirm_password: '',
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
    if (!formData.user_id && !formData.token) {
      toast.error('Click the link sent to your email to reset your password!');
      push('/auth/forgot-password');
      return;
    }
    await resetPassword(formData);
  };

  return (
      <form className="auth_form" onSubmit={handleSubmit}>
         <div className="form_group">
          <label>New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
            required={true}
            minLength={8}
            placeholder='Minimum of 8 characters'
          />
          <div className='show_pword' onClick={() => setShowPassword((prevState) => !prevState)}>
            {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
        <div className="form_group">
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            onChange={handleChange}
            value={formData.confirm_password}
            required={true}
          />
          <div className='show_pword' onClick={() => setShowPassword((prevState) => !prevState)}>
            {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
        <button className='auth_btn' style={isLoading ? { cursor: "wait", background: "#8a8a8a" } : { cursor: "pointer" }}>
          {isLoading ? 'Loading...' : 'Reset Password!'}
        </button>
      </form>
  );
}