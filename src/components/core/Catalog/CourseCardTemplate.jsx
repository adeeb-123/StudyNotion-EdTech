import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

export const CourseCardTemplate = ({course , Height}) => {
    const [avgReviewCount , setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count)
    } , [course])
  return (
    <div className=''>
        <Link to={`/courses/${course._id}`}>
        <div>
            <div>
                <img src={course?.thumbnail}
                alt='course thumbnail'
                className={`${Height} w-[85%] rounded-xl object-cover`}/>
            </div>
            <div className='pl-6 flex flex-col gap-y-1'>
                <p className='text-richblack-5 font-semibold mt-3 text-2xl '>{course?.courseName}</p>
                <p className='text-richblack-100'>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                <div className='flex items-center gap-x-3'>
                    <span className='text-yellow-50 font-semibold text-lg'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className='text-richblack-100'>({course?.ratingAndReviews.length} Ratings)</span>
                </div>

                <p className='text-richblack-5 text-xl font-semibold'>Rs. {course?.price}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}
