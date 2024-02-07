import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import HighLightText from '../components/core/common/HighLightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/core/common/Footer'
import ReviewSlider from '../components/core/common/ReviewSlider'



const Home = () => {
  return (
    <div>
        {/* Section -1  */}
           <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>

            <Link to={"/signup"}>

                <div className=' mt-16  p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transiition-all duration-200 hover:scale-95 w-fit group borderBottom '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transiition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>

            </Link>

             <div className='text-center text-4xl font-semibold mt-7'>
              Empower You Future with
              <HighLightText text={"Coding Skills"} />
             </div>

             <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </div>

             <div className='flex flex-row gap-7 mt-8'>
                  <CTAButton active={true}  linkedto={'/signup'}>
                    Learn More
                  </CTAButton>

                  <CTAButton active={false}  linkedto={'/login'}>
                    Book a Demo
                  </CTAButton>
             </div>

             <div className=' mx-3 my-14 boxShadow '>
              <video
              muted 
              loop
              autoPlay>
                  <source src={Banner} type="video/mp4" />
              </video>
             </div>


              {/* code Section -1  */}
              <div>
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                  <div className='text-4xl font-semibold'>
                       Unlock Your 
                       <HighLightText text={"coding potential"} />
                       with our online courses
                  </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText:"Try it Yourself",
                linkedto:"/signup",
                active:true
              }}

              ctabtn2={{
                btnText:"Learn More",
                linkedto:"/login",
                active:false
              }}

              codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body >\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
              codeColor={"text-blue-200"}

              backgoundGradient={true}
              
              />


              </div>

               {/* code Section -2  */}
               <div>
                <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                  <div className='text-4xl font-semibold'>
                       Start 
                       <HighLightText text={" coding in seconds"} />
                      
                  </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText:"Continue Lesson",
                linkedto:"/signup",
                active:true
              }}

              ctabtn2={{
                btnText:"Learn More",
                linkedto:"/login",
                active:false
              }}

              codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
              codeColor={"text-yellow-25"}
              
              backgoundGradient={false}
              />


              </div>

              <ExploreMore/>

           </div>

        {/* Section -2  */}
               <div className='bg-pure-greys-5 text-richblack-700'>
                  <div className='homepage_bg h-[323px]'>
                      <div className='w-11/12 max-w-maxConetnt flex flex-col items-center gap-5 mx-auto'>
                         <div className='h-[150px]'></div>
                             <div className='flex flex-row gap-7 text-white'>
                             <CTAButton active={true} linkedto={"/signup"}>
                                   <div className='flex items-center gap-3'>
                                   Explore Full Catalog
                                   <FaArrowRight/>
                                   </div>
                                   
                             </CTAButton>
                             <CTAButton active={false} linkedto={"/login"}>
                                       <div>
                                        Learn More
                                       </div>
                             </CTAButton>
                             </div>
                              
                      </div>
                  </div>


                  <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                             <div className='flex flex-row gap-10 mb-10 mt-[95px] justify-center '>
                                     <div className='text-4xl font-semibold w-[45%]'>
                                      Get the skills you need for a
                                      <HighLightText text={"job that is in demand"}/>
                                     </div>

                                     <div className='flex flex-col w-[40%] items-start gap-10'>
                                      <div className='text-[16px]'>
                                      The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                      </div>
                                      <CTAButton active={true} linkedto={"/signup"}>
                                                Learn More
                                      </CTAButton>
                                     </div>
                             </div>

                             <TimeLineSection/>

                             <LearningLanguageSection/>
                  </div>

                  
               </div>

        {/* Section -3  */}
              <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                        
                        <InstructorSection/>

                        <h2 className='text-center text-4xl font-semibold  mt-10'>
                Review from other Learners
              </h2>
              {/* Review Slider here  */}
              <ReviewSlider/>
              </div>

             

        {/* Section -4  */}

       <Footer/>
    </div>
  )
}

export default Home