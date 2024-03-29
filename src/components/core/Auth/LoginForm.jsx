import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
const LoginForm = ({setIsLoggedIn}) => {
    const [formData, setFormData] = useState({
        email:"",password:""
    })

    const navigate =useNavigate();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);

    function changeHandler(event){
        setFormData((prevData)  => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )
    }
    const { email, password } = formData

    function handleOnSubmit(event){
        event.preventDefault();
        dispatch(login(email,password , navigate));
    }
  return (
    <form onSubmit={handleOnSubmit}
    className='flex flex-col w-full gap-y-4 mt-6'>

        <label className='w-full '>
            <p
            className='text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]'>
              Email Address <sup className='text-pink-200'>*</sup> 
              </p>
          <input 
          required
          type='email'
          value={formData.email}
          onChange={changeHandler}
          name='email'
          placeholder='Enter Email here'
          className='bg-richblack-800 text-richblack-5 rounded-[0.5rem] w-full p-[12px]'
          />
        </label>

        <label className='w-full relative'>
            <p
             className='text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]'>
              Password <sup className='text-pink-200'>*</sup> 
              </p>
          <input 
          required
          type={showPassword ? ("text")  :  ("password")}
          value={formData.password}
          name='password'
          onChange={changeHandler}
          placeholder='Enter Password here'
          className='bg-richblack-800 text-richblack-5 rounded-[0.5rem] w-full p-[12px]' 
          />

          <span
          className='absolute right-3 top-[38px] cursor-pointer'
          onClick={() => setShowPassword((prev)=> !prev)}>
            {showPassword ? 
            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye  fontSize={24} fill='#AFB2BF'/>)}
          </span>

          <Link to="/forgot-password">
            <p className=' text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                Forgot Password
            </p>
          </Link>

        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900  px-[12px] py-[8px] mt-5' 
        type='submit'>
            Sign In
        </button>
    </form>
  )
}

export default LoginForm