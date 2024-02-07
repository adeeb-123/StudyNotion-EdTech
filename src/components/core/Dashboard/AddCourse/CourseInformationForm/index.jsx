import { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../../../../services/apis";
import { fetchCourseCategories } from "../../../../../services/operations/courseAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";


import { RequirementField } from "./RequirementField";
import {setCourse, setStep} from "../../../../../slices/courseSlice"
import IconBtn from "../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { addCourseDetails ,editCourseDetails } from "../../../../../services/operations/courseAPI";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const{token} = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    // console.log("This is course" , course)
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefilts", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !==  course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenefilts !== course.whatYouWillLearn||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail  )
            return true;
     else
              return false;
  }
  const onFinalSubmit = async (data) => {
    // console.log("This is data - " , data)
    // if editing the course 
    if(editCourse){
      if(isFormUpdated()) {
        const currentValues = getValues();
      const formData = new FormData();

      formData.append("courseId" ,course._id);

      if(currentValues.courseTitle !== course.courseName)
      {formData.append("courseName" ,data.courseTitle);}

      if(currentValues.courseShortDesc !== course.courseDescription)
      {formData.append("courseDescription" ,data.courseShortDesc);}

      if(currentValues.coursePrice !== course.price)
      {formData.append("price" ,data.coursePrice);}

      if(currentValues.courseTags.toString() !== course.tags.toString())
      {formData.append("tags" ,JSON.stringify(data.courseTags) );}

      if(currentValues.courseBenefilts !== course.whatYouWillLearn)
      {formData.append("whatYouWillLearn" ,data.courseBenefilts);}

      if(currentValues.courseCategory._id !== course.category._id )
      {formData.append("category" ,data.courseCategory);}

      if(currentValues.courseRequirements.toString()  !== course.instructions.toString())
      {formData.append("instructions" ,JSON.stringify(data.courseRequirements) );}

      if(currentValues.courseImage !== course.thumbnail)
      {formData.append("thumbnail" ,data.courseImage);}

      setLoading(true);
      // console.log(formData)
      const result = await editCourseDetails(formData , token);
      setLoading(false);
      if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
          
      }
      else{
        toast.error("No Changes made to Form")
      }
      return;
    }
   
    //if creating course 
    const formData = new FormData();
    formData.append("courseName" , data.courseTitle )
    formData.append("courseDescription" ,data.courseShortDesc)
    formData.append("price" ,data.coursePrice )
    formData.append("tags" ,JSON.stringify(data.courseTags) )
    formData.append("whatYouWillLearn" ,data.courseBenefilts )
    formData.append("category" ,data.courseCategory )
    formData.append("instructions" ,JSON.stringify(data.courseRequirements) )
    formData.append("thumbnail" ,data.courseImage)
    formData.append("status" , COURSE_STATUS.DRAFT )

    setLoading(true)
    // console.log(formData)
    const result = await addCourseDetails(formData , token);
    if(result){
      dispatch(setStep(2))
      // console.log("One - " , result)
      dispatch(setCourse(result));
    }
    setLoading(false)
  };
  return (
    <form
      onSubmit={handleSubmit(onFinalSubmit)}
      className="border-richblack-700 bg-richblack-800  rounded-md p-6 my-8 border-2"
    >
      <div className="flex flex-col w-full gap-y-3">
        <label className="text-white text-lg" htmlFor="courseTitle">
          Course Title <sup className="text-pink-300 text-lg">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && <span>Please Enter Course Title</span>}
      </div>

      <div className="flex flex-col w-full gap-y-3 mt-5">
        <label className="text-white text-lg" htmlFor="courseShortDesc">
          Course Short Description{" "}
          <sup className="text-pink-300 text-lg">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Course Description"
          className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg min-h-[140px] text-start"
          {...register("courseShortDesc", { required: true })}
        />
        {errors.courseShortDesc && <span>Please Enter Course Description</span>}
      </div>

      <div className="flex flex-col w-full gap-y-3 mt-5 relative">
        <label className="text-white text-lg" htmlFor="coursePrice">
          Course Price <sup className="text-pink-300 text-lg">*</sup>
        </label>
        <input
          type="text"
          id="coursePrice"
          placeholder="Enter Course Price"
          className="bg-richblack-700 rounded-lg pl-14 py-3 border-b-2 border-b-richblack-300 text-lg"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })}
        />
        <HiOutlineCurrencyRupee className="text-2xl text-richblack-300 absolute left-4 top-14" />
        {errors.coursePrice && <span>Please Enter Course Price</span>}
      </div>

      <div className="flex flex-col w-full gap-y-3 mt-5">
        <label className="text-white text-lg" htmlFor="courseCategory">
          Course Category<sup className="text-pink-300 text-lg">*</sup>
        </label>

        <select
          defaultValue= {`${editCourse === true ? `${course?.category} `: ""}`}
          {...register("courseCategory", { required: true })}
          className="bg-richblack-700 px-3 py-3 rounded-lg border-b-2 "
        >
          <option value="">Choose a Category</option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex flex-col w-full gap-y-3 mt-5">
        <label className="text-white text-lg" htmlFor="courseBenefilts">
          Benefits of the Course{" "}
          <sup className="text-pink-300 text-lg">*</sup>
        </label>
        <textarea
          id="courseBenefilts"
          placeholder="Enter Course Benefits"
          className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg min-h-[140px] text-start"
          {...register("courseBenefilts", { required: true })}
        />
        {errors.courseBenefilts && <span>Please Enter Course Benefits</span>}
      </div>

      <RequirementField 
      label="Requirements/Instructions"
      name="courseRequirements"
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues} />

      <div className=" w-full flex justify-end mt-6 items-center gap-x-3">
        {
          editCourse && (
            <button onClick={() => dispatch(setStep(2))}
            className="bg-richblack-600 text-white font-semibold rounded-lg px-3 py-2">
              Continue Without Saving
            </button>
          )
        }

        <IconBtn  text={!editCourse ? "Next" : "Save Changes"} customClasses={"bg-yellow-50 font-semibold"} />
      </div>
    </form>
  );
}
