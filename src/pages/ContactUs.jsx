import React from 'react'
import ContactUsCard from '../components/core/ContactUs/ContactUsCard'
import ContactUsForm from '../components/core/ContactUs/ContactUsForm'
import Footer from '../components/core/common/Footer'
import ReviewSlider from '../components/core/common/ReviewSlider'

const ContactUs = () => {
  return (
<section className='w-screen'>
    <div className='w-[80%] mx-auto flex items-start gap-4 lg:pt-[100px] justify-center '>
        <div className='w-[40%] flex justify-end pr-16'>
            <ContactUsCard/>
        </div>
        <div className='w-[55%] border border-richblack-800 rounded-md py-8 px-6'>
            <p className='text-richblack-5 text-4xl font-semibold font-inter'>Got a Idea? We’ve got the skills. Let’s team up</p>
            <p className='text-richblack-300 mt-2'>Tall us more about yourself and what you’re got in mind.</p>
            <ContactUsForm/>
        </div>
    </div>
    
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                        <h2 className='text-center text-4xl font-semibold  mt-10'> Review from other Learners</h2>
                       {/* Review Slider here  */}
                        <ReviewSlider/>
    </div>

       <Footer/>
 </section>
   
  )
}

export default ContactUs