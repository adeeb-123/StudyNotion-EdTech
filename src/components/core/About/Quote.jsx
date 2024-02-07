import React from 'react'
import {FaQuoteLeft , FaQuoteRight} from "react-icons/fa"

const Quote = () => {
  return (
    <div className='text-center font-semibold text-4xl text-richblack-100 w-[80%] mx-auto  relative px-8 py-6 min-h-[180px] leading-[-2%]'>
      <FaQuoteLeft className='absolute top-1 text-richblack-700'/>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
         <span className=' text-transparent bg-gradient-to-br from-[#1FA2FF]  via-[#12D8FA] to-[#A6FFCB] bg-clip-text'>
          {` combines technology`}
        </span>,
        <span className=' text-transparent bg-gradient-to-br from-[#FF512F]   to-[#F09819] bg-clip-text'>
       {` expertise`}
        </span>,
         and community to create an 
         <span className=' text-transparent bg-gradient-to-br from-[#E65C00]   to-[#F9D423] bg-clip-text'>
          {` unparalleled educational`} 
         </span>  experience.
        <FaQuoteRight className='absolute -bottom-1 right-0 translate-x-[-150px] text-richblack-700'/>
    </div>
  )
}

export default Quote