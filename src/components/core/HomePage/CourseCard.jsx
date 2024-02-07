import React from 'react'
import "../../../App.css"
import {FaUserFriends } from "react-icons/fa"
import {TbBinaryTree2} from "react-icons/tb"



const CourseCard = ({cardData , currentCard , setCurrentCard}) => {
  return (
    <div className={`flex flex-col items-center gap-5  justify-between  h-[300px] w-[342px]
    ${currentCard === cardData.heading ? "bg-white cardShadow" : "bg-richblack-800"} 
    transiton-all duration-200`} 
    onClick={() => setCurrentCard(cardData.heading)}>
           <div className='mt-6 w-[90%]'>
            <p className={`${currentCard === cardData.heading ? "text-richblack-600 " : "text-richblack-25"} font-semibold text-[20px]`}>
              { cardData.heading}
            </p>


            <p className='text-left text-richblack-300 text-md  mt-3'>
              {cardData.description}
            </p>
           </div>

           <div className={`${currentCard === cardData.heading ? "text-[#1FA2FF]  " : "text-richblack-300"} font-semibold text-base flex items-center justify-between w-full px-8 py-2 h-[50px] border-richblack-300 border-t-2 border-dashed`}>
            <div className='flex items-center gap-1 '>
              {/* icon  */}
              <FaUserFriends className='text-xl'/>
              <p>{cardData.level}</p>
            </div>

            <div className='flex items-center gap-1 '>
              {/* icon  */}
              <TbBinaryTree2  className='text-xl'/>
              <p>{`${cardData.lessionNumber} Lessons`}</p>
            </div>
           </div>
    </div>
  )
}

export default CourseCard