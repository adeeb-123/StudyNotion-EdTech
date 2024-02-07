import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
import { FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const videoSpecificData = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filterData = courseSectionData.filter(
          (course) => course?._id === sectionId
        );

        const filteredVideoData = filterData[0].subSections.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData[0]);
        setIsVideoEnded(false);
      }
    };
    videoSpecificData();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const subSectionLength =
      courseSectionData[currentSectionIndex].subSections.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === subSectionLength - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const subSectionLength =
      courseSectionData[currentSectionIndex].subSections.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSections[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/watch-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSections.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSections[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/watch-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const subSectionLength =
      courseSectionData[currentSectionIndex].subSections.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex !== subSectionLength - 1) {
      const newSubSectionId =
        courseSectionData[currentSectionIndex].subSections[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/watch-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`
      );
    } else {
      const newSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const newSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSections[0]._id;
      navigate(
        `/watch-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`
      );
    }
  };
  const handleVideoCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div className="w-[90%] mx-auto text-white relative">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => {
            setIsVideoEnded(true);
          }}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />

          {isVideoEnded && (
            <div className="w-full flex items-center gap-x-4 justify-end my-4 ">
              {!isFirstVideo() && (
                <button
                  onClick={goToPrevVideo}
                  className="p-3 rounded-lg text-black bg-yellow-50 flex items-center gap-x-1 cursor-pointer  text-lg"
                  disabled={loading}
                >
                  <BsChevronCompactLeft /> Prev
                </button>
              )}

              {!completedLectures.includes(subSectionId) && (
                <button
                  onClick={() => handleVideoCompletion()}
                  className="p-3 rounded-lg text-black bg-yellow-50 cursor-pointer "
                  disabled={loading}
                >
                  {!loading ? (
                    <p className="flex items-center gap-x-1 text-lg">
                      {" "}
                      Mark As Complete <BsChevronCompactRight />
                    </p>
                  ) : (
                    <p>Loading....</p>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  if (playerRef.current) {
                    playerRef.current.seek(0);
                    setIsVideoEnded(false);
                  }
                }}
                className="p-3 rounded-lg text-black bg-yellow-50  cursor-pointer  text-lg"
                disabled={loading}
              >
                Rewatch
              </button>

              <div>
                {!isLastVideo() && (
                  <button
                    onClick={goToNextVideo}
                    className="p-3 rounded-lg text-black bg-yellow-50 cursor-pointer flex items-center gap-x-1  text-lg"
                    disabled={loading}
                  >
                    Next <BsChevronCompactRight />
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <div className="mt-20 ">
        <h1 className="text-3xl font-semibold text-white ">
          {videoData?.title}
        </h1>

        <p className="mt-4 text-richblack-100 ">{videoData?.description}</p>
      </div>
    </div>
  );
};
