import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { createRating } from '../../../services/operations/courseAPI';

export const CourseReviewModal = ({setReviewModal}) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState:{errors }
      } = useForm();

      useEffect(() =>{
        setValue("courseExperience" , "")
        setValue("courseRating" , 0)
      },[])

      const {user} = useSelector((state) => state.profile);
      const{token} = useSelector((state) => state.auth);
      const[loading,setLoading]  = useState(false);
      const{courseEntireData} = useSelector((state) => state.viewCourse)

      const ratingChanged = (newRating) => {
             setValue("courseRating" , newRating)
      }

      const onSubmit = async(data) => {
        console.log(data)
         setLoading(true)
        await createRating({
            courseId:courseEntireData?._id,
            rating:data.courseRating, 
            review:data.courseExperience
        }, token)
        setLoading(false);
        setReviewModal(false)
      }
   
  return (
    <div className='w-screen h-screen  bg-richblack-300 bg-opacity-50 flex justify-center items-center absolute top-0 left-0'>

        <div className='bg-richblack-800 h-[60%] w-[40%] rounded-lg overflow-hidden '>
            <div className='flex items-center justify-between px-3 bg-richblack-500 py-3 text-white border-b font-semibold'>
                <p>Add review</p>
                <button onClick={() => setReviewModal(false)} disabled={loading}><RxCross1  className='cursor-pointer' /></button>
            </div>

            <div className='w-[80%] mx-auto flex items-center justify-center gap-x-3 my-4'>
                <img src={user?.image} alt="" className='h-[60px] aspect-square rounded-full' />
                <div className='text-white'>
                    <p className=' font-semibold my-1'>{user?.firstName} {user?.lastName}</p>
                    <p className='text-sm text-richblack-100'>Posting Publicly</p>
                </div>
            </div>


            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full flex justify-center my-4'>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                activeColor="#ffd700"
                size={24}/>

              </div>
                    <label className='w-[80%] mx-auto text-white flex flex-col gap-y-2'>
                       <p>Add Your Experiences <sup>*</sup></p>
                        <textarea
                        type='text'
                        id='courseExperience'
                        name='courseExperience'
                        className=' p-3 w-full bg-richblack-700 min-h-[100px] rounded-lg border border-richblack-300 text-white '
                        {...register("courseExperience" , {required:true})}
                        />
                    </label>

                    <div className='flex items-center gap-x-3 pr-4 justify-end my-4'>
                        <button className="text-white font-semibold bg-richblack-500 py-2 px-4 rounded-lg" onClick={() => setReviewModal(false)} disabled={loading}>Cancel</button>
                        <button className="text-black font-semibold bg-yellow-50 py-2 px-4 rounded-lg" type='submit'>Add Review</button>

                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}
