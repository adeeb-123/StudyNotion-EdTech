import React from 'react'
import HighLightText from '../components/core/common/HighLightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/About/Quote'
import AboutImage from "../assets/Images/FoundingStory.png"
import "../App.css"
import { data } from '../data/about-banner'
import LearningGrid from '../components/core/About/LearningGrid'
import ContactFormSection from '../components/core/About/ContactFormSection'
import ReviewSlider from '../components/core/common/ReviewSlider'
import Footer from '../components/core/common/Footer'



const AboutUs = () => {
  return (
    <div>

        {/* section1  */}
        <section className='text-richblack-5 pt-10 relative h-fit min-h-[618px] w-full bg-richblack-800 flex flex-col items-center justify-center gap-4'>
            
            
            <div className='text-center text-4xl font-semibold mt-7'>
              Driving Innovation in Online Education for a <br/>
              <HighLightText text={"Brighter Future"} />
             </div>

             <div className='mt-4 w-[60%] mx-auto text-center text-lg font-semibold text-richblack-300 mb-36 '>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>

             <div className='flex items-center gap-8 w-full justify-center absolute bottom-0 translate-y-[50%]'>
                <img src={BannerImage1} alt="" />
                <img src={BannerImage2} alt="" />
                <img src={BannerImage3} alt="" />
             </div>


        </section>

        {/* section-2  */}
        <section className='h-fit mb-[100px]'>
            <div className='lg:mt-[250px]'>
                <Quote/>
            </div>
        </section>

        {/* section3  */}
        <section className='border-t border-t-richblack-700 pt-20 mb-20'>
            <div className='w-screen'>
                      <div className='w-[80%] flex items-center mx-auto  gap-32'>
                                <div className='w-[45%] text-left text-richblack-300'>
                                    <p className=' text-transparent bg-gradient-to-br from-[#833AB4]  via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl font-semibold mb-3'>
                                    Our Founding Story 
                                    </p>

                                    <div className='text-[16px]'>
                                    <p>
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                    </p>
                                    
                                    <br/>
                                    <p>
                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                    </p>
                                    </div>

                                

                                </div>

                                <div className=' min-w-[534px] w-[50%] h-[342px] relative z-10'>
                                    <div className='aboutImg-gardiant'></div>
                                    <img src={AboutImage} alt=""  className='z-10'/>
                                </div>
                      </div>

                          <div className='w-screen h-[150px]'></div>
                      <div className='w-[80%] mx-auto flex items-center gap-36'>
                            <div className='w-[40%] text-left text-richblack-300'>
                                <p className=' text-transparent bg-gradient-to-br from-[#E65C00]   to-[#F9D423] bg-clip-text text-3xl font-semibold mb-3'>Our Vision</p>
                                <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                            </div>

                            <div className='w-[40%] text-left text-richblack-300'>
                                <p className=' text-transparent bg-gradient-to-br from-[#1FA2FF]  via=[#12D8FA]  to-[#A6FFCB] bg-clip-text text-3xl font-semibold mb-3'>Our Mission</p>
                                <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                      </div>
            </div>
        </section>

        {/* section4  */}
        <section className='bg-richblack-800 w-screen h-fit min-h-[254px] flex justify-center items-center '>
           <div className='flex items-center justify-between w-[70%] mx-auto '>
             {
                data.map((item , index) => (
                    <div className='flex flex-col items-center gap-3 text-richblack-5 ' key={index}>
                        <p className='text-3xl font-semibold'>{item.number}</p>
                        <p className='text-richblack-300 text-[18px] font-semibold'>{item.title}</p>
                    </div>

                ))
             }
           </div>
        </section>


         {/* section-5  */}
         <LearningGrid/>

         {/* section6  */}
         <ContactFormSection/>

         {/* section7  */}
         <h2 className='text-center text-4xl font-semibold  mt-16 text-richblack-5'>Review from other Learners</h2>
              {/* Review Slider here  */}
             <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
             <ReviewSlider/>
             </div>


        <Footer/>
              
    </div>
  )
}

export default AboutUs