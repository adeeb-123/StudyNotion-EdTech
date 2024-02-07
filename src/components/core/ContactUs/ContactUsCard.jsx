import React from 'react'
import {BiSolidMessageDetail} from "react-icons/bi"
import {BsGlobeEuropeAfrica , BsFillTelephoneFill} from "react-icons/bs"
const ContactUsCard = () => {
  return (
    <div className='flex flex-col gap-6 min-h-[390px] h-fit w-[90%] bg-richblack-800 rounded-md pt-10 pl-8'>
            <div className='flex gap-4 items-center text-richblack-5'>
               <BiSolidMessageDetail className='text-richblack-200 text-[24px]'/>
               <div>
                <p className='font-semibold text-[22px]'>Chat on us</p>
                <p className='text-richblack-200 text-sm mt-1'>Our friendly team is here to help.</p>
                <p className='text-richblack-200 text-sm mt-1'>fuzailahmad2605@gmail.com</p>
               </div>
            </div>  

            <div className='flex gap-4 items-center text-richblack-5'>
               <BsGlobeEuropeAfrica className='text-richblack-200 text-[24px]'/>
               <div>
                <p  className='font-semibold text-[22px]'>Visit us</p>
                <p className='text-richblack-200 text-sm mt-1'>Come and say hello at our office HQ.</p>
                <p className='text-richblack-200 text-sm mt-1'>Here is the location/ address</p>
               </div>
            </div>  

            <div className='flex gap-4 items-center text-richblack-5'>
               <BsFillTelephoneFill className='text-richblack-200 text-[24px]'/>
               <div>
                <p  className='font-semibold text-[22px]'>Call us</p>
                <p className='text-richblack-200 text-sm mt-1'>Mon - Fri From 8am to 5pm</p>
                <p className='text-richblack-200 text-sm mt-1'>+123 456 7890</p>
               </div>
            </div>  
    </div>
  )
}

export default ContactUsCard