import React, { useState } from 'react'

import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from '../common/HighLightText';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];


const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses ,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard ,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setmyCards = (value) => {

        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
        
    }


  return (
    <div className=''>
            <div className='text-4xl font-semibold text-center'>
                Unlock the 
                <HighLightText text={"Power of Code"}/> 
            </div>

            <p className='text-center text-richblack-300 text-md  mt-3'>Learn to Build Anything You Can Imagine</p>
     
              <div className='flex flex-row items-center rounded-full bg-richblack-800 mt-5 border-richblack-100 border-md px-1 py-1'>
                {
                    tabsName.map( (element ,index) =>{
                        return(
                            <div
                            className={`tex-[16px] ${currentTab  === element ? "bg-richblack-900 text-richblack-5 font-medium" :
                                "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer 
                                hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                                key={index}
                                onClick={() => setmyCards(element)}
                            >
                                {element}
                            </div>

                        )
                    })
                }
              </div>

              <div className='lg:h-[300px]'></div>
    
 
             <div className='flex flex-row items-center gap-10  w-full absolute bottom-0 translate-y-[25%] translate-x-[-15%]'>
                {
                    courses.map((element ,index) => {
                        return(
                           <CourseCard 
                           key={index}
                           cardData={element} 
                           currentCard={currentCard}
                           setCurrentCard = {setCurrentCard}
                           />

                        )
                    })
                }
             </div> 
    
    </div>
  )
}

export default ExploreMore