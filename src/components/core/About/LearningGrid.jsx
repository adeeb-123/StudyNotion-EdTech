import React from 'react'
import HighLightText from "../common/HighLightText"
import CTAButton from "../HomePage/CTAButton"

const LearningGrid = () => {

    const LearningGridArray = [
        {
            order:-1,
            heading:"World-Class Learning for",
            highlightText:"Anyone, Anywhere",
            descripition:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            btnText:"Learn More",
            btnLink:"/"
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            descripition:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order:2,
            heading:"Our Learning Methods",
            descripition:"The learning process uses the namely online and offline."
        },
        {
            order:3,
            heading:"Certification",
            descripition:"You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order:4,
            heading:`Rating "Auto-grading"`,
            descripition:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order:5,
            heading:"Ready to Work",
            descripition:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        },

    ]
  return (
   <div className='grid mx-auto lg:grid-cols-4 grid-cols-1 mb-10 w-[80%] mt-32'>
     {
        LearningGridArray.map( (card , index) => {
            return (
                <div key={index}  
                className={`${index === 0 && "lg:col-span-2 bg-richblack-900"}
                ${
                    card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
                }
                ${
                    card.order === 3 && "lg:col-start-2"
                }
               min-h-[294px] h-fit pt-4 px-6`}>

                    {
                        card.order < 0 ? (
                                <div>
                                    <div className='text-4xl font-semibold text-richblack-5'>
                                        {card.heading}<br/>
                                        <HighLightText text={card.highlightText}/>
                                    </div>
                                    <p className='mt-4 text-richblack-300 font-semibold '>
                                        {card.descripition}
                                    </p>

                                      <div className='mt-10 flex justify-start'>
                                    <CTAButton active={true} linkedto={card.btnLink}>
                                        {card.btnText}
                                    </CTAButton>
                                    </div>

                                </div>
                        )  : (
                            <div >
                                <p className='text-xl font-semibold text-richblack-5'>{card.heading}</p>
                                <p className='mt-10 text-richblack-100 font-[400] text-sm w-[90%] '>{card.descripition}</p>
                            </div>
                        )
                    }
                </div>
            )
        })
     }
   </div>
  )
}

export default LearningGrid