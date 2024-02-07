import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
export const RequirementField = ({label, name, errors ,register , setValue , getValues }) => {
    const [requirement ,setRequirement] = useState("");
    const[requirementList , setRequirementList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)
    useEffect(() => {
        // console.log("Course inside Requirement" , course)
        if(editCourse){
           setRequirementList(course?.instructions)
        }
        register(name , 
            {
                required:true,
                validate:(value) => value.length > 0    
                    } )
    },[]);

    useEffect(() => {
    setValue(name ,requirementList)
    } ,[requirementList])
    const handleAddRequirement = () => {
         if(requirement){
            setRequirementList([...requirementList , requirement]);
            setRequirement("");
         }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index ,1);
        setRequirementList(updatedRequirementList);
    }
  return (
    <div className="flex flex-col w-full gap-y-3 mt-5">
         <label className="text-white text-lg" htmlFor={name}>
          {label}{" "}
          <sup className="text-pink-300 text-lg">*</sup>
        </label>

              <div className='w-full'>
                     <input
                     type='text'
                     id={name}
                     value={requirement}
                     onChange={(e) => setRequirement(e.target.value)}
                     className="bg-richblack-700 rounded-lg px-3 py-3 border-b-2 border-b-richblack-300 text-lg w-full"
                     />

                   <button type='button'
                   onClick={handleAddRequirement}
                   className='font-semibold text-yellow-50 mt-2 flex items-center gap-x-1'>
                            <IoMdAdd /> 
                             Add
                   </button>
              </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement , index) => (
                            <li key={index} className='flex items-center gap-x-1 text-sm mt-1 '>
                                <span className='capitalize'>{requirement}</span>
                                <button className='rounded-lg text-richblack-300 border-[1px] px-1 py-0.5 text-xs mt-1 ' onClick={() => handleRemoveRequirement(index)}>Remove</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span>{label} is Required</span>
        )}
    </div>
  )
}
