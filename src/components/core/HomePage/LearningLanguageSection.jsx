import React from 'react'
import HighLightText from '../common/HighLightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton';



const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[150px] items-center mb-32'>

           <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for 
            <HighLightText text={"learning any language"}/>
           </div>

           <div className='text-center text-richblack-600 text-base w-[70%] font-medium'>
           Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
           </div>

           <div className='flex flex-row items-center justify-center mt-5'>
             <img src={know_your_progress} alt="" className='object-contain -mr-32'/>
             <img src={compare_with_others} alt=""className='object-contain' />
             <img src={plan_your_lesson} alt="" className='object-contain -ml-36'/>
           </div>

           <div className='my-5'>
            <CTAButton active={true} linkedto={"/signup"}>
                         Learn More
            </CTAButton>
           </div>
    </div>
  )
}

export default LearningLanguageSection