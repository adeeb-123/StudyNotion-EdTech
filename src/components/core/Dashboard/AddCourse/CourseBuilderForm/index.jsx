import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseAPI";
import { NestedView } from "./NestedView";

export default function CourseBuilderForm() {

  const dispatch = useDispatch();
  const [editSectionName , setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const {course} = useSelector((state) => state.course)
  const{token} = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
 

//   Functions 
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  const goBack =() => {
       dispatch(setStep(1))  
       dispatch(setEditCourse(true))
  }
  const goNext =() => {
    if(course.courseContent.length === 0){
        toast.error("Please enter at least one Section")
        return;
    }
    if(course.courseContent.some((section) => section.subSections.length === 0)){
        toast.error("Please enter at least one Lecture")
        return;
    }

   dispatch(setStep(3)) 
  }
  const onSubmit= async(data) => {
     setLoading(true);
     let result;

     if(editSectionName){
        // console.log("CourseId in frontEnd - " , course._id)
        result = await updateSection(
            {
                sectionName: data.sectionName,
                sectionId:editSectionName,
                courseId:course._id,
            }, token
        )
     }else{
        result = await createSection({
                         sectionName:data.sectionName,
                         courseId:course._id
        },token)
     }

    //  update values
    if(result){
        console.log("Course after updated Section Name - " ,  result)
        dispatch(setCourse(result))
        setEditSectionName(null)
        setValue("sectionName" , "")
    } 
    setLoading(false)
  }
 
  const handleEditSectionName = (sectionId , sectionName) => {
   if(editSectionName === sectionId){
    cancelEdit()
    return;
   }
    setEditSectionName(sectionId)
    setValue("sectionName" , sectionName)
  }

  return (
    <div className="w-full bg-richblack-800 border-richblack-700 border-2 text-white rounded-lg px-3 py-4">
      <p className="text-2xl font-semibold ">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-y-3 mt-5">
          <label className="text-white text-lg" htmlFor="sectionName">
            Section Name<sup className="text-pink-300 text-lg">*</sup>
          </label>
          <input
           id="sectionName"
           name="sectionName"
           placeholder="Add Section Name"
           {...register("sectionName" , {
            required:true
           })}
           className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg"
           />
           {errors.sectionName && (<span>PLease Enter Section Name</span>)}
        </div>

       <div className="flex items-center gap-x-2">
       <IconBtn 
        type={"submit"}
        text={editSectionName ? "Edit Section Name": "Create Section "}
        customClasses={"px-3 py-2 rounded-lg text-yellow-50 border-yellow-50 border-2 mt-3 flex items-center gap-x-2 "}
        >
           <IoMdAddCircleOutline size={19}/>
        </IconBtn>
        {
            editSectionName && (
                <span type="button" 
                onClick={cancelEdit}
                className="text-xs underline text-richblack-300 cursor-pointer">Cancel Edit</span>
            )
        }
         </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleEditSectionName={handleEditSectionName}/>
      )}

      <div className="w-full flex flex-end items-center justify-end gap-x-3 mt-3">
          <button className="px-6 py-2 rounded-lg bg-richblack-700   text-black"
          onClick={goBack}>
            Back
          </button>
          <IconBtn 
          text={"Next"}
          onclick={goNext}
          customClasses={"bg-yellow-50 rounded-lg px-3 py-2"}>
                   <FaChevronRight />
          </IconBtn>
      </div>
    </div>
  );
}
