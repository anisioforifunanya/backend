'use client'
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useSignup from '@/hooks/useSignup.jsx';
import { toast } from 'react-toastify';

export default function SignupForm() {

  const { isLoading, response, signup } = useSignup();

  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    email: '',
    gender: '',
    password: '',
    confirm_password: '',
    phone_number: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error('Password fields do not match');
      return;
    }
    await signup(formData)
  };

  return (
      <form className="auth_form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleUsernameChange}
            value={formData.username}
            required={true}
          />
        </div>
        <div className="form_group">
          <label>Display Name:</label>
          <input
            type="text"
            name="display_name"
            onChange={handleChange}
            value={formData.display_name}
            required={true}
          />
        </div>
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
          <label>Gender</label>
          <div className='gender_form_group'>
            <label>Male</label>
              <input
              type="radio"
              name="gender"
              onChange={handleChange}
              value={"male"}
              required={true}
            />
            <label>Female</label>
              <input
              type="radio"
              name="gender"
              onChange={handleChange}
              value={"female"}
              required={true}
            />
          </div>
        </div>
        <div className="form_group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone_number"
            onChange={handleChange}
            value={formData.phone_number}
            required={true}
            placeholder='+234 123 456 7890'
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
        <button className='auth_btn' style={isLoading ? { cursor: "wait", background: "#8a8a8a" } : {}}>
          {isLoading ? 'Loading...' : 'Register!'}
        </button>
      </form>
  );
}
