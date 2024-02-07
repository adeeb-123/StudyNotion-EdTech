import React, { useEffect, useState } from 'react'
import { Swiper , SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import ReactStars from 'react-stars'
import { ratingsEndpoints } from '../../../services/apis'
import { apiConnector } from '../../../services/apiconnector'
import { FaStar } from 'react-icons/fa'

const ReviewSlider = () => {
  const [ reviews , setReviews] = useState([]);
  const truncate = 15;

  useEffect(() => {
    const fetchReviewRating = async() => {
             const response = await apiConnector("GET" , ratingsEndpoints.REVIEWS_DETAILS_API )
             console.log("Reviews" ,response);
             if(response){
              setReviews(response?.data?.allReviews)
             }
             
    }
    fetchReviewRating();
    console.log(reviews)
  } ,[])
  return (
    <div className='text-white'>
      <div className='min-h-[240px] max-w-maxContent'>
        <Swiper 
         slidesPerView={3}
         spaceBetween={50}
         loop={true}
         freeMode={true}
         autoplay={
          {
            delay:1500,
          }
         }
         modules={[FreeMode , Pagination ,Autoplay]}
         className='w-full my-8'
         >

          {
            reviews.map((review , index) => (
              <SwiperSlide key={index}>
                   <div className='bg-richblack-800 rounded-sm shadow-lg h-[240px] w-[370px] p-4'>
                    <div className=' flex items-center gap-x-3 w-[90%] mx-auto'>
                    <img src={
                      review?.user?.image ?
                                    review?.user?.image :
                                     `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} alt=""
                                     className='h-10 w-10 rounded-full object-cover' />
                          <div>
                            <p className='text-normal font-semibold text-white my-0.5'>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p className='text-richblack-100 text-sm '>{review?.user?.email}</p>
                          </div>
                    </div>
                    <p className='w-[90%] mx-auto text-white text-opacity-90 font-semibold my-4'>{review?.review.split(" ").splice(0,truncate).join(" ")}...........</p>

                    <div className='my-4 flex items-center gap-3 w-[90%] mx-auto'>
                      <p className='text-lg text-yellow-50 font-semibold'>{review?.rating.toFixed(1)}</p>
                      <ReactStars 
                         count={5}
                         value={review?.rating}
                         size={20}
                         edit={false}
                         activeColor="ffd700"
                         emptyIcon={<FaStar/>}
                         fullIcon={<FaStar/>}
                      />
                    </div>

                    <p className='text-sm text-richblue-100 font-semibold w-[90%] mx-auto'>Student | {review?.course?.courseName}</p>
                   </div>
              </SwiperSlide>
            ))
          }

        </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider