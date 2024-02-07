import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'

export const RenderTotalAmount = () => {
    const {total , cart} = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
   const dispatch = useDispatch();

    const handleBuyCourse = () => {
        //payment gateway
        const courses = cart.map((course, index) => course._id)
        console.log("Bought these courses - " , courses)

        if (token) {
          buyCourse(token, courses, user, dispatch, navigate);
          return;
        } else {
          toast.error("Please Login First");
        }
    }
  return (
    <div className='w-[30%]'>
 
       <div className='bg-richblack-700 rounded-md max-w-[90%] mx-auto border border-richblack-500 p-5'>
          <p className='text-richblack-100 font-semibold my-2'>Total:</p>
          <p className='text-2xl text-yellow-50 font-semibold' >Rs. {total}</p>

          <IconBtn 
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses={"w-full bg-yellow-50 text-black p-4 font-semibold text-center mt-5"}
          />
       </div>
    </div>
  )
}
