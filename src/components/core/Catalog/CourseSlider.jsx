import React from 'react'
import { Swiper , SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CourseCardTemplate } from './CourseCardTemplate'

export const CourseSlider = ({Courses}) => {
  return (
    <div className='mt-10 '>
         {
         Courses?.length ? (
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={0}
            centeredSlides={false}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper "
            breakpoints={{
                1024:{slidesPerView:3}
            }}> 
                {
                    Courses.map((course , index) => (
                        <SwiperSlide key={index} >
                             <CourseCardTemplate course={course} Height={"h-[250px]"} /> 
                        </SwiperSlide>
                    ))
                }
            </Swiper>
         ) :
          (
            <p>No Course found</p>
          )
        }
    </div>
  )
}
