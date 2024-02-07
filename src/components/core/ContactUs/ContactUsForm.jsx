import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CTAButton from '../HomePage/CTAButton';
import "../../../App.css"
import {apiConnector} from "../../../services/apiconnector"
import {contactusEndpoint} from "../../../services/apis"
import CountryCode from "../../../data/countrycode.json"
import SpinnerTwo from '../common/SpinnerTwo';
import { toast } from 'react-hot-toast';

const ContactUsForm = () => {

  const [loading , setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors , isSubmitSuccessful}
  } = useForm();

  const {
    CONTACT_US_API
  } = contactusEndpoint;
  const submitContactForm = async(data) => {
      console.log("Logging Data")
      console.log(data)
      try{
                   setLoading(true);
                  const response = await apiConnector("POST" , CONTACT_US_API , data);
                  // const response = {status:"OK"}
                   console.log("Logging response" , response)
                   setLoading(false)
                   toast.success("Thank You ")
      }catch(e){
                    console.log("Error" ,e.message);
                    setLoading(false);
      }
  }
  useEffect( () => {
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:""
      })
    }
  }, [reset , isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='w-[90%] mx-auto text-richblack-5'>

      <div className='w-full flex items-center justify-between mt-12 mb-6'>
        {/* firstname  */}
        <div className='flex flex-col gap-4 w-[45%] relative'>
          <label htmlFor='firstname' className='text-richblack-5'>First Name</label>
          <input
          type='text'
          name='firstname'
          id='firstname'
          placeholder='Enter first name'
          {...register('firstname' , {required:true})}
          className='bg-richblack-800 px-2 py-4 rounded-md text-richblack-5 placeholder:text-richblack-500 '
          />
          {
            errors.firstname && (
             <span>
               <div className='absolute bottom-[1px] left-[45%] h-3 w-3 rotate-45 rounded bg-richblack-800  -z-1 '></div>
                  <span className='absolute bottom-[-15px] left-[25%] rounded-md px-2 py-1  z-10 bg-richblack-800 text-richblack-300 text-xs'>
                    Please enter first name
                  </span>
             </span>
            )
          }
        </div>

        {/* lastname  */}
        <div className='flex flex-col gap-4 w-[50%] relative'>
          <label htmlFor='lastname' className='text-richblack-5'>Last Name</label>
          <input
          type='text'
          name='lastname'
          id='lastname'
          placeholder='Enter last name'
          {...register('lastname' , {required:true})}
          className='bg-richblack-800 px-2 py-4 rounded-md text-richblack-5 placeholder:text-richblack-500 '
          />
          {
            errors.lastname && (
              <span>
              <div className='absolute bottom-[1px] left-[45%] h-3 w-3 rotate-45 rounded bg-richblack-800  -z-1 '></div>
                 <span className='absolute bottom-[-15px] left-[25%] rounded-md px-2 py-1  z-10 bg-richblack-800 text-richblack-300 text-xs'>
                   Please Enter last name
                 </span>
            </span>
            )
          }
        </div>
      </div>

       {/* email  */}
       <div className='flex flex-col gap-4 w-full mb-6 relative'>
          <label htmlFor='email' className='text-richblack-5'>Email</label>
          <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter Email'
          {...register('email' , {required:true})}
          className='bg-richblack-800 px-2 py-4 rounded-md text-richblack-5 placeholder:text-richblack-500 '
          />
          {
            errors.email && (
              <span>
              <div className='absolute bottom-[1px] left-[45%] h-3 w-3 rotate-45 rounded bg-richblack-800  -z-1 '></div>
                 <span className='absolute bottom-[-15px] left-[35%] rounded-md px-2 py-1  z-10 bg-richblack-800 text-richblack-300 text-xs'>
                   Please enter Your Email
                 </span>
            </span>
            )
          }
        </div>

        {/* phone no   */}
        <div className='flex flex-col gap-4 w-full mb-6'>
             <label htmlFor='phoneNo' className='text-richblack-5'>
              Phone Number
             </label>

             <div className='w-full flex items-center gap-5'>
                    {/* dropdown  */}
                    <div className='w-[80px]'>
                      <select
                      name='dropdown' id='dropdown'
                      {...register('countrycode' , {required:true})}
                      className='w-[70px] flex flex-col py-4 bg-richblack-800 rounded-md text-richblack-5 pl-4 text-[18px]'>
                        {
                           CountryCode.map( (element ,index) => {
                            return (
                              <option key={index} value={element.code}>
                                           {element.code} - {element.country}
                              </option>
                            )
                           })
                        }
                      </select>
                    </div>

                    <div className='w-full relative'>
                      <input
                         type='number'
                         name='phoneNo'
                         id='phoneNo'
                         placeholder='12345 6789'
                         
                         className='bg-richblack-800 px-2 py-4 rounded-md text-richblack-5 placeholder:text-richblack-500 w-full text-[18px] '
                         {...register("phoneNo" , 
                         {
                          required:{value:true , message:"Please Enter Phone Number"},
                          maxLength:{value:"10" , message:"Enter Valid Number"},
                          minLength:{value:8, message:"Enter Valid Number"}
                         })}
                      />
                      {
                           errors.phoneNo && (
                            <span>
                            <div className='absolute bottom-[-14px] left-[36%] h-3 w-3 rotate-45 rounded bg-richblack-800  -z-1 '></div>
                               <span className='absolute bottom-[-30px] left-[25%] rounded-md px-2 py-1  z-10 bg-richblack-800 text-richblack-300 text-xs'>
                                 Please enter valid number
                               </span>
                          </span>
                                 )
                                  }
                    </div>
             </div>
        </div>


        {/* message  */}
        <div className=' flex flex-col gap-4 w-full mb-6 relative'>
          <label htmlFor='message'  className='text-richblack-5'>Message</label>
          <textarea
          name='message'
          id='message'
          cols='30'
          rows='7'
          placeholder='Enter Your MEssage here'
          {...register('message' , {required:true})}
          className='bg-richblack-800 px-2 py-4 rounded-md text-richblack-5 placeholder:text-richblack-500 '
          />
          {
            errors.message && (
              <span>
               <div className='absolute bottom-[1px] left-[45%] h-3 w-3 rotate-45 rounded bg-richblack-800  -z-1 '></div>
                  <span className='absolute bottom-[-15px] left-[34%] rounded-md px-2 py-1  z-10 bg-richblack-800 text-richblack-300 text-xs'>
                    Please enter your message
                  </span>
             </span>
            )
          }
         
        </div>

        <button type='submit' className='w-full text-center text-[13px] px-6 py-3 rounded-md font-semibold bg-yellow-50 text-black btnShadow1 mb-6'>
                   {
                    loading ? (<SpinnerTwo/>) : (
                      <p>Send Message</p>
                    )
                   }
        </button>
    </form>
  )
}

export default ContactUsForm