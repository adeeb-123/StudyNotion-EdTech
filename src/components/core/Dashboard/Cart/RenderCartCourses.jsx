import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import { useState } from 'react';
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';


export const RenderCartCourses = () => {

  const {cart} = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  return (
    <div className='w-[70%] '>
        {
          cart.map((course , index) => (
            <div key={index} className='flex justify-between items-start px-4 my-4 border-b-2 py-3 border-b-richblack-700'>
                     <div className=' w-[70%] flex items-start gap-x-5'>
                         <img src={course?.thumbnail} alt="" className=' h-[150px] rounded-md aspect-video'/>
                         <div >
                          <p className='text-2xl font-semibold text-white'>{course?.courseName}</p>
                          <p className='text-lg text-richblack-100 '>{course?.category?.name}</p>
                            <div className='flex items-center gap-x-3'>
                              {/* yaha avg rating nikalni hai  */}
                                  <span className='text-yellow-50 text-lg'>{GetAvgRating(course?.ratingAndReviews)}</span>
                                  {/* <ReactStars
                                  count={5}
                                  size={20}
                                  edit={false}
                                  activeColor="#ffd700"
                                  emptyIcon={<IoIosStarOutline />}
                                  fullIcon={<IoIosStar />}
                                  /> */}
                                  <RatingStars Review_Count={course?.ratingAndReviews} />


                               <span className='text-richblack-100'>({course?.ratingAndReviews?.length} Ratings)</span>
                            </div>
                         </div>
                     </div>

                     <div>
                           <button onClick={() => dispatch(removeFromCart(course._id))} className='bg-richblack-700 border border-richblack-500 rounded-md p-3 flex items-center gap-x-1 text-[#a23131] font-semibold'>
                           <RiDeleteBin6Line />
                           <span className='text-lg'>Remove</span>
                           </button>

                           <p className='text-yellow-50 font-semibold text-2xl mt-5'>Rs. {course?.price}</p>
                    </div>
            </div>
          ))
        }
    </div>
  )
}
