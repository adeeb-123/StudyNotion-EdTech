import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { getAllInstructorCourses } from '../../../../services/operations/courseAPI';
import { FaHandsClapping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { InstructorChart } from './InstructorChart';

export const InstructorDashboard = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading ,setLoading] = useState(false);
    const[instructorData , setInstructorData] = useState(null);
    const [courses,setCourses] = useState(null);
   


    useEffect(() => {
      const  getCourseDataWithStats = async() => {
                setLoading(true);
                const instructorApiData = await getInstructorData(token);
                const result = await getAllInstructorCourses(token);

                if(instructorApiData.length){
                    setInstructorData(instructorApiData)
                }
                if(result){
                    setCourses(result)
                }
                setLoading(false);
      }
      getCourseDataWithStats();
            
    
    },[])
    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='w-[90%] mx-auto'>
          
          <div >
            <h1 className='flex items-center gap-x-2 text-2xl font-semibold text-white'>Hi {user?.firstName} <span className='text-yellow-50'><FaHandsClapping /></span> </h1>
            <p className='font-semibold text-white my-2  '>Let's start something new</p>
          </div>

        {
            loading? (<div>Loading...</div>) : 
            courses?.length > 0 ?
            (
                      <div>

                          <div className='flex justify-between items-start my-8'>
                          
                          <InstructorChart  instructorData={instructorData}/>
                          <div className='w-[30%] rounded-md bg-richblack-800 p-4 text-white'>
                            <p className='font-semibold text-3xl text-white my-3 '>Statistics</p>
                            <div className='my-3'>
                                <p className='my-1 text-xl font-semibold text-richblack-100 '> Total Courses :</p>
                                <p className='font-semibold text-2xl '>{courses.length}</p>
                            </div>

                            <div className='my-3'>
                                <p className='my-1 text-xl font-semibold text-richblack-100 '> Total Students :</p>
                                <p className='font-semibold text-2xl '>{totalStudents}</p>
                            </div>

                            <div className='my-3'>
                                <p className='my-1 text-xl font-semibold text-richblack-100 '> Total Income :</p>
                                <p className='font-semibold text-2xl '>{totalAmount}.00 <sup>INR</sup></p>
                            </div>
                          </div>
                          </div>

                          <div className='my-8 text-white font-semibold bg-richblack-800 rounded-md '>
                            <div className='p-5 flex justify-between items-center '>
                                <p className='text-2xl' >Your Courses</p>
                              <Link to={"/dashboard/my-courses"} >  <p className='text-normal text-yellow-50 cursor-pointer'>View All</p></Link>
                            </div>

                            <div className='flex items-center justify-between w-[90%] mx-auto my-5'>{
                                     courses.slice(0,3).map((course) => (

                                        <div>
                                            <img src={course?.thumbnail} alt="" className='h-[168px] aspect-video object-cover'/>
                                            <div className='my-4'>
                                                <p className='text-white  text-lg font-semibold'>{course?.courseName}</p>
                                                <div className='flex items-center gap-x-1 text-sm font-semibold text-richblack-100'>
                                                    <p>{course.studentsEnrolled.length} Students</p>
                                                    <p> | </p>
                                                    <p> RS. {course.price}</p>
                                                    </div>
                                            </div>
                                        </div>

                                     ))
                                   } </div>
                          </div>
                      </div>
            ) : (
                <div>
                    <p className='text-white text-lg text-center'>You have not created any course yet</p>
                    <Link to={"/dashboard/addCourse"}>
                      <p className='bg-yellow-50 to-black p-3 rounded-lg text-center mt-2 w-[300px] mx-auto'>Create</p>
                    </Link>
                </div>
            )
        }
    </div>
  )
}
