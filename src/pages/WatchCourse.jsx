import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { VideoDetailsSidebar } from "../components/core/WatchCourse/VideoDetailsSidebar";
import { CourseReviewModal } from "../components/core/WatchCourse/CourseReviewModal";

export const WatchCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const courseSpecificData = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      let lectures = 0;
      courseData?.courseDetails?.courseContent.forEach((sec) => {
        lectures += sec.subSections.length;
      });
      dispatch(setTotalNoOfLectures(lectures));

      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData?.courseDetails));
      dispatch(setCompletedLectures(courseData?.completedVideos));

      //  dispatch(setTotalNoOfLectures(lectures))
    };
    courseSpecificData();
  }, []);
  return (
    <>
      <div className="relative">
        <div className="w-screen overflow-hidden min-h-screen flex items-start  ">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
          <div className="h-[100vh] overflow-y-auto overflow-x-hidden">
            <div className='mx-auto w-11/12 min-w-[1300px] py-4 overflow-x-hidden'>
               <Outlet />
            </div>
          </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};
