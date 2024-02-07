import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSubSection } from "../../../../../services/operations/courseAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { updateSubSection } from "../../../../../services/operations/courseAPI";
import { RxCross1 } from "react-icons/rx";
import IconBtn from "../../../common/IconBtn";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Upload from "../Upload";

export const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course , editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();

    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.video) {
      formData.append("video", currentValues.lectureVideo);
    }
    formData.append("courseId" , course._id)

    console.log("Edit Form Data")
    setLoading(true);
    // API CALL
    const result = await updateSubSection(formData, token );
    if (result) {
      // TODO: CHECK FOR UPDATION
      // const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section)
      // const updatedCourse = {...course , courseContent : updatedCourseContent}
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to form");
      } else {
        // edit the subsection
        handleEditSubSection();
      }
      return;
    }

  //  add 
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    formData.append("courseId" , course._id)
    console.log("formData" , formData)
    setLoading(true);
    // API CALL
    const result = await createSubSection(formData, token );
    if (result) {
      // TODO: CHECK FOR UPDATION
      // const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section)
      // const updatedCourse = {...course , courseContent : updatedCourseContent}
      // console.log("Before - " , course
      dispatch(setCourse(result));
      
      
    }
    setModalData(null);
    setLoading(false);
  };
  return (
    <div className={`w-screen min-h-screen  bg-richblack-700 bg-opacity-80 flex items-center justify-center overflow-y-hidden z-[150] ${editCourse === true ? "absolute -top-[12%] -left-[50%]" : "absolute top-0 left-0"}`}>
     <div className="h-full w-full overflow-y-auto flex justify-center">
     <div className="rounded-xl w-[40%] min-h-[80vh] h-fit bg-richblack-800 translate-y-[-10%] z-[200] pb-20 mt-32">
        {/* topbar  */}
        <div className="px-4 py-2 bg-richblack-700 flex items-center justify-between text-white border-b-2 rounded-t-xl">
          <p className="text-2xl">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            className="text-richblack-300  text-2xl hover:text-white "
            onClick={() => {
              if (!loading) {
                setModalData(null);
              }
            }}
          >
            <RxCross1 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-[90%] mx-auto">
          <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          video={true}
          viewData={view ? modalData?.videoUrl : null}
          editData={edit ? modalData?.videoUrl : null}
        />

          {/* title  */}
          <div className="flex flex-col w-full gap-y-3 mt-5">
            <label className="text-white text-lg" htmlFor="lectureTitle">
              Course Title <sup className="text-pink-300 text-lg">*</sup>
            </label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && <span>Please Enter Lecture Title</span>}
          </div>

          {/* description  */}
          <div className="flex flex-col w-full gap-y-3 mt-5">
            <label className="text-white text-lg" htmlFor="lectureDesc">
              Lecture Description <sup className="text-pink-300 text-lg">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              name="lectureDesc"
              placeholder="Enter Lecture Description"
              className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg min-h-[140px] text-start"
              {...register("lectureDesc", { required: true })}
            />
            {errors.lectureDesc && (
              <span>Please Enter Lecture Description</span>
            )}
          </div>
          {!view && (
            <div>
              <IconBtn
                text={loading ? "Loading..." : edit ? "Save Changes " : "Save"}
                customClasses={"bg-yellow-50 px-2 py-2 mt-4 text-black"}
              />
            </div>
          )}
        </form>
      </div>
     </div>
    </div>
  );
};
