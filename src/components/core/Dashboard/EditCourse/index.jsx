import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { RenderSteps } from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse(){
    const dispatch = useDispatch();
    const courseId = useParams();
    const {course} = useSelector((state) => state.course);
    const[loading, setLoading]  = useState(false);
    const{token} = useSelector((state) => state.auth);

    useEffect(() => {
        const  populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId , token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])
    if(loading){
        return (
            <div>
                Loading....
            </div>
        )
    }
  return (
    <div className='w-full min-h-screen flex flex-col items-center '>
        <h1 className='w-full ml-[250px] text-2xl text-richblack-5'>Edit Course</h1>

        <div className='w-[50%] -translate-x-[30%]'>
            {
                course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}
