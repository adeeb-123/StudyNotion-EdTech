import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);

    } catch {
      console.log("Unable to fetch Enrolled Courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  return (
    <div className="text-white w-[90%] mx-auto p-6">
      <div className="text-3xl text-white font-semibold my-4">
        Enrolled Courses
      </div>

      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className="w-full text-xl font-semibold text-center my-6">
          You have not Enrolled in any course yet
        </p>
      ) : (
        <div className="rounded-t-2xl  overflow-hidden">
          <table className="w-full">
            <thead className="w-full h-[50px] bg-richblack-600 rounded-t-2xl p-4">
              <tr className="px-4 ">
                <td className="pl-3">Course Name</td>
                <td>Duration</td>
                <td>Progress</td>
              </tr>
            </thead>

            <tbody>
              {enrolledCourses.map((course, index) => (
                <tr key={index} className="h-[70px] border-b border-b-richblack-500 ">
                  <td className="w-[70%] ">
                    <div className="w-[100px] aspect-square ml-4 clear-none flex items-center gap-x-5" 
                      onClick={() => navigate(`/watch-course/${course._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSections[0]?._id} `) }
                    >
                      <img src={course.thumbnail} alt="" />
                      <div className="flex flex-col gap-y-2">
                        <p className="text-normal w-[400px] h-[18px] text-white font-semibold">{course.courseName}</p>
                        <p className="text-sm h-[15px] w-full text-richblack-100 ">{course.courseDescription.substring(0,60)}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="text-richblack-100 ">100hrs</div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-y-4 text-richblack-100 mr-3">
                      <p>Progress: {course.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
