import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import  CourseBuilderForm  from "./CourseBuilderForm";
import Publishcourse from "./Publishcourse";



export const RenderSteps = () => {
  const {step} = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3, 
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="w-[99%] flex items-center  mx-auto my-4 ">
        {steps.map((item) => (
          <>
            <div className="w-[33%] z-10">
              <div
                className={`h-[50px] w-[50px] rounded-full flex justify-center items-center  ${
                  step >= item.id
                    ? "bg-yellow-900 border-[1px] border-yellow-50  text-yellow-50"
                    : "bg-richblack-800 border-[1px] border-rcihblack-700 text-richblack-700"}
                `}
              >
                {step > item.id ? <FaCheck className=" text-yellow-50 "/> : item.id}
              </div>
            </div>

             {/* add dashes for labels  */}


          </>
        ))}
      </div>

      <div className="w-[99%] flex items-center mx-auto my-4 " >
      {steps.map((item) => (
        <>
         <div className={` w-[33%] ${step >= item.id ? "text-white" : "text-richblack-700"}`}>{item.title}</div>
        </>
      )) }
      </div>

      <div className="w-[99%] flex items-center mx-auto my-4 -translate-y-20 " >
      {
        steps.map((item)=> (
            <div className={`w-[33%] h-[1px] -z-10 ${item.id === 3 ? "hidden" :"block" && step > item.id ? "border-t-2 border-dashed border-t-yellow-50": "border-t-2 border-dashed border-t-richblack-700" }`}></div>
        ))
      }
      </div>
     
     

      {step === 1 && <CourseInformationForm/>}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <Publishcourse/>}
    </>
  );
};
