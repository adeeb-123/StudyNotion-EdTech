import React from 'react'
import CTAButton from '../HomePage/CTAButton'
import ContactUsForm from '../ContactUs/ContactUsForm'

const ContactFormSection = () => {
  return (
    <section className='w-screen lg:mt-[200px]'>
        <div className='w-[50%] mx-auto '>
              <p className='text-4xl font-semibold text-center text-richblack-5'>Get in Touch</p>
              <p className='text-richblack-300 mt-2 text-center'>We’d love to here for you, Please fill out this form.</p>

            <div>
                <ContactUsForm/>
            </div>
        </div>
    </section>
  )
}

export default ContactFormSection