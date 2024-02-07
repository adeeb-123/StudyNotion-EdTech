import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation, useNavigate } from 'react-router-dom';
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md"
import { NavLink } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Spinner from '../components/core/common/Spinner';
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

     const [formData , setFormData] = useState({
        password:"",
        confirmPassword:""
     });
     const {password , confirmPassword} = formData;

    const [showPassword ,setShowPassword] = useState(false);
    const {loading} = useSelector( (state) => state.auth);

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]:e.target.value,
            }
        ))
    };

    const handleOnSubmit =(e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password ,confirmPassword ,token , navigate));

        setFormData({
            password:"",
            confirmPassword:""
        })
    }
  return (
    <div className="bg-richblack-900 h-fit min-h-screen w-full flex  items-center text-richblack-5 justify-center ">
         {
            loading ? (
               <Spinner/>

            ) : (
                <div className="max-w-[30vw] w-fit mx-auto ">

                    <h1 className="font-semibold text-3xl mb-4">Choose  new password</h1>
                    <p className="text-lg font-[400] text-richblack-100 mb-4">
                    Almost done. Enter your new password and youre all set.
                    </p>

                    <form onSubmit={handleOnSubmit}>

                        <label className='relative'>
                        <p className="text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]">
                  New Password <sup className="text-pink-200">*</sup> </p>
                            <input
                            type={ showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='bg-richblack-800 text-richblack-5 rounded-[0.5rem] w-full p-[12px] my-1'
                            />

                            <span className="absolute right-3 top-[40px]" 
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? <MdOutlineVisibility fontSize={24} fill='#AFB2BF'/> : <MdOutlineVisibilityOff fontSize={24} fill='#AFB2BF'/>
                                }
                            </span>
                        </label>

                        <label className='relative '>
                        <p className="text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem] mt-4">
                  Confirm Password <sup className="text-pink-200">*</sup></p>
                            <input
                            type={ showPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='bg-richblack-800 text-richblack-5 rounded-[0.5rem] w-full p-[12px] my-1'
                            />

                            <span className="absolute right-3 top-[95px]" 
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? <MdOutlineVisibility fontSize={24} fill='#AFB2BF'/> : <MdOutlineVisibilityOff fontSize={24} fill='#AFB2BF'/>
                                }
                            </span>
                        </label>

                        <button type='submit' className="text-center text-[13px] px-6 py-3 rounded-md font-semibold bg-yellow-50 text-black mt-6 w-full">
                            Reset Password
                        </button>
                    </form>


                        <NavLink to={"/login"}>
                            <div className="flex items-center gap-2 mt-4 text-richblack-5">
                                <AiOutlineArrowLeft className='mt-1'/>
                                <p>Back to Login</p>
                            </div>
                        </NavLink>
                </div>

            )
         }
    </div>
  )
}

export default UpdatePassword