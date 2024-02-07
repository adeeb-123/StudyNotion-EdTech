import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseAPI";
import { resetCourseState } from "../../../../../slices/courseSlice";


export default function Publishcourse() {
    const{register , handleSubmit , setValue , getValues} = useForm();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const {course} = useSelector((state) => state.course)
     const{token} = useSelector((state) => state.auth)
     const [loading, setLoading] = useState(false);


     useEffect( () => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public" ,true)
        }
     } , [])

     const goToCourses =() => {
        dispatch(resetCourseState());
         navigate("/dashboard/my-courses")
     }

     const handleCoursePublish = async() => {
         if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
         (course.status  === COURSE_STATUS.DRAFT && getValues("public") === false)){
            // no updation in from 
            // no need to call api 
            goToCourses();
            return;
         }
        //  if form is updated 
        const  formData = new FormData();
        formData.append("courseId" , course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status" , courseStatus);

        setLoading(true);
        const result =await editCourseDetails(formData , token)

        if(result){
            goToCourses();
        }
        setLoading(false);

     }

     const goBack =() =>{
           dispatch(setStep(2));
     }
     const goNext =() => {
              handleCoursePublish();
     }
     const onSubmit = (data) => {

     }
    return(
        <div className="bg-richblack-700 border-2 text-richblack-300 rounded-lg p-6">

            <p className="text-2xl font-inter text-white">Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="flex flex-row-reverse items-center gap-x-3 w-full justify-end  mt-6">
                <label htmlFor="public" className="text-white">Make this Course Publish</label>
                <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="rounded h-4 w-4 text-lg accent-yellow-50"
                />
               </div>

               <div className="mt-5 w-full flex justify-end items-center gap-x-4">
                <button disabled={loading} 
                type="button"
                onClick={goBack}
                className="flex bg-richblack-800 rounded-lg px-5 py-2">
                    Back
                </button>

                <IconBtn disabled={loading} text={"Save Changes"} customClasses={"bg-yellow-50"} onclick={goNext}/>
               </div>
            </form>
        </div>
    )
}