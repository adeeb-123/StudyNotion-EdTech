import React, { useEffect, useState } from "react";
import Footer from "../components/core/common/Footer";
import { PaymentDetailsModal } from "../components/core/common/PaymentDetailsModal";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { courseEndpoints } from "../services/apis";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/core/common/RatingStars";
import { RxDropdownMenu } from "react-icons/rx";
import { HiDesktopComputer } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReviewSlider from "../components/core/common/ReviewSlider";

const { COURSE_DETAILS_API } = courseEndpoints;

export const ViewCourse = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const [whatyouLearn , setWhatYouLearn] = useState([]);
  const [ lectures , setLectures] = useState(0);
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      });
      console.log("COURSE_DETAILS API  - ", response);
      setCourseDetails(response?.data?.courseDetails);
      // set what you learn 
      const tempData = response?.data?.courseDetails?.whatYouWillLearn.split("\r\n\r\n") 
      setWhatYouLearn(tempData);

      //calculate  no of lectures
      let tempLectures = 0
      for(const section of response?.data?.courseDetails?.courseContent){
        for(const subSection of section?.subSections){
              tempLectures+=1;
        }
      }
      setLectures(tempLectures)
      setLoading(false);
    };
    getCourseDetails();
   
  }, [courseId]);

  useEffect(() => {
    // console.log(courseDetails);
    const count = GetAvgRating(courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);

  }, [courseDetails]);
  return (
    <div className="min-h-[100vh] flex flex-col gap-y-8 ">
      {loading === true ? (
        <p>Loading...</p>
      ) : (
        <>
          {courseDetails?.length === 0 ? (
            <p>No Course Found</p>
          ) : (
            <div className="w-full h-full">
              {/* upper part  */}
              <div className="h-[40vh] w-full bg-richblack-800 p-8 flex  items-start justify-between ">
                <div className="w-[80%] mx-auto flex items-start justify-between">
                  <div className="w-[70%] border-r-richblack-700 border-r">
                    {/* section-1  */}
                    <div>
                      <p className="text-lg text-richblack-100 ">
                        {"Home / Caourse /  "}{" "}
                        <span className="text-yellow-50">
                          {courseDetails?.category.name}
                        </span>
                      </p>
                      <p className="text-3xl text-white font-semibold my-3">
                        {courseDetails?.courseName}
                      </p>
                      <p className="text-richblack-100 text-normal overflow-hidden h-[19px]">
                        {courseDetails?.courseDescription.substring(0, 120)}
                      </p>

                      <div className="text-sm mt-3 text-richblack-100 flex items-center gap-x-3">
                        <div className="flex items-center gap-x-3">
                          <span className="text-yellow-50 font-semibold text-lg">
                            {avgReviewCount || 0}
                          </span>
                          <RatingStars Review_Count={avgReviewCount} />
                          <span className="text-richblack-100">
                            ({courseDetails?.ratingAndReviews.length} Ratings)
                          </span>
                        </div>
                        <p>{courseDetails?.studentsEnrolled.length} Students</p>
                      </div>
                    </div>
                  </div>
                  <PaymentDetailsModal  courseData={courseDetails}/>
                </div>
              </div>

              {/* lower part  */}
              <div className="w-[80%] mx-auto ">
                {/* section-1  */}
                <div className="w-[70%] rounded-md border border-richblack-700 p-4 mt-10">
                      <p className="text-3xl font-semibold text-white">What you'll learn</p>
                      <ul className="text-richblack-100 list-disc mt-3">{
                        whatyouLearn.length === 0 ? (<p>Data Not Found</p>) : 
                         (  
                             whatyouLearn.map((item , index) => (
                          <li key={index} className="text-sm text-richblack-100 my-2 ml-3">{item}</li>
                        ))
                         )
                      }</ul>
                </div>

                  {/* section-2  */}
                  <div className="w-[70%]  mt-10 ">
                    <p className="text-3xl font-semibold text-white">Course Content</p>
                    <div>
                      <ul className="list-disc flex items-center gap-x-10 text-richblack-100 mt-5 ml-3">
                        <li>{courseDetails?.courseContent.length} Sections</li>
                        <li>{`${lectures}`} Lectures</li>
                        <li>100hrs</li>
                      </ul>
                    </div>

                    <div className="w-full border-richblack-700 p-6">
                      {
                        courseDetails?.courseContent.map((section) => (
                          <details key={section._id}  className=" transition-all duration-800">
                            <summary className="bg-richblack-700 border-b border-b-richblack-500  flex justify-between py-2 px-4 cursor-pointer">
                              <div  className="text-white font-semibold  text-lg flex items-center gap-x-3">
                                  <IoIosArrowDown />
                                  <p>{section?.sectionName}</p>
                              </div>

                              <p className="text-yellow-50">{section?.subSections.length} lectures</p>
                             

                            </summary>

                            <div >
                              {
                                section?.subSections.map((subSection) => (
                                   <details className="border border-richblack-700 transition-all duration-200 " key={subSection._id}>
                                    <summary className="cursor-pointer">
                                    <div className="flex items-center gap-x-3 text-richblack-100 text-lg font-semibold p-3 appearance-none">
                                       <HiDesktopComputer />
                                       <p>{subSection?.title}</p>
                                       <IoIosArrowDown />
                                        </div>
                                    </summary>

                                    <p className="font-semibold text-richblack-100 ml-5 py-3 ">{subSection?.description}</p>
                                   </details>

                                    
                                ))
                              }
                            </div>
                          </details>
                        ))
                      }
                    </div>
                  </div>

                  {/* section-3  */}
                  <div className="w-[70%] mt-6 py-4">
                       <p className="text-3xl font-semibold text-white">Author</p>
                       <div className="flex items-center gap-x-4 mt-3">
                        <img src={courseDetails?.instructor?.image} alt="" className="h-[50px] aspect-square rounded-full" />
                        <div>
                          <p className="text-lg font-semibold text-white">{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                          <p className="text-richblack-100 font-semibold mt-2">{courseDetails?.instructor?.additionalDetails?.about}</p>
                        </div>
                       </div>
                  </div>
              </div>

              {/* section7  */}
         <h2 className='text-center text-4xl font-semibold  mt-16 text-richblack-5'>Review from other Learners</h2>
              {/* Review Slider here  */}
             <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
             <ReviewSlider/>
             </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};
