'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchParams } from 'next/navigation';
import useLogin from '@/hooks/useLogin.jsx';

export default function LoginForm() {

  const { isLoading, login } = useLogin();

  const queryParams = useSearchParams(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
     <h2 className='pb-8 text-2xl font-bold'>Please login to continue</h2>
      <form className="auth_form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required={true}
            placeholder='example@gmail.com'
          />
        </div>
        <div className="form_group">
          <label>Password:</label>
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
        <button className='auth_btn' style={isLoading ? { cursor: "wait", background: "#8a8a8a" } : { cursor: "pointer" }}>
          {isLoading ? 'Loading...' : 'Login!'}
        </button>
        <Link href="/auth/forgot-password" >Forgot password?</Link>
      </form>
    </>
  );
}