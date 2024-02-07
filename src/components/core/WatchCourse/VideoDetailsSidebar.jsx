import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  IoCaretBackCircleSharp } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import ProgressBar from "@ramonak/react-progress-bar";

export const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [activeVideo, setActiveVideo] = useState("");
  const[progress ,setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
     
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSections.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubSectionIndex
        ]._id;

      // set currnet sub section and section as active
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setActiveVideo(activeSubSectionId);
      setProgress(completedLectures.length / totalNoOfLectures * 100 )
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className="bg-richblack-800 border-r border-r-richblack-700 w-[15rem] min-h-screen">
      {/* for buttons  */}

      <div className="flex items-center justify-between pl-1 w-full my-3 px-2">
        <button onClick={() => navigate("/dashboard/enrolled-courses")} className="text-4xl text-richblack-300">
          <IoCaretBackCircleSharp />
        </button>
        <button
          className="text-black font-semibold bg-yellow-50 py-2 px-4 rounded-lg"
          onClick={() => setReviewModal(true)}
        >
          Add Review
        </button>
      </div>

      {/* for heading  */}
      <div className="flex flex-col  gap-y-3 py-4 border-b border-b-richblack-300 mb-3 pl-2">
        <p className="font-semibold text-white text-lg">{courseEntireData?.courseName}</p>
        <p className=" text-sm text-caribbeangreen-500 font-semibold">{completedLectures?.length} / {totalNoOfLectures} Lectures Completed | {progress.toFixed(1)}%</p>
        <div className="w-[95%]">
        <ProgressBar
                        completed={ progress || 0}
                        height="8px"
                        isLabelVisible={false}
                        bgColor="#FFD60A"
                      />
        </div>
      </div>

      {/* main section  */}
      <div>
        {courseSectionData.map((section, index) => (
          <div onClick={() => setActiveStatus(section?._id)} key={index}>

            {/* section  */}
            <div className="w-full bg-richblack-700 text-white py-3 px-3 cursor-pointer my-1">

              <div className="flex items-center justify-between">
                {section?.sectionName}
                {activeStatus === section._id ? <FaChevronUp /> : <FaChevronDown /> }
              </div>

            </div>

            {/* subSections  */}
            <div>
                {
                   activeStatus === section?._id && (
                    <div className="transition-all duration-300">
                        {
                            section?.subSections.map((topic , index) => (
                                <div className={` flex gap-5 p-2 cursor-pointer transition-all duration-300 my-1 ${topic._id === activeVideo ? "bg-yellow-50  text-richblack-900" : "bg-richblack-900 text-white"}`}
                                key={index}
                                 onClick={() => {
                                  navigate(`/watch-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                  setActiveVideo(topic?._id)
                                  }}>
                                    <input type="checkbox"
                                    checked={completedLectures.includes(topic?._id)}
                                    onChange={() => {
                                    }}
                                    />
                                    <span>
                                        {topic?.title}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                   )
                }
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
