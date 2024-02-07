import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { updateAdditionalDetails } from '../../../../services/operations/settingsAPI';

const genders = ["Male" , "Female" , "Other"] 
const EditProfile = () => {
const {token} = useSelector((state) => state.auth)
const {user} = useSelector((state) => state.profile)
const dispatch =  useDispatch()
const navigate =  useNavigate()


const {
  register,
  handleSubmit,
  formState: {errors}
} = useForm()

const submitProfileForm = async (data) => {
  // console.log("FormData  - " , data)
  try{
    dispatch(updateAdditionalDetails(token , data))
  }catch(error) {
    console.log("ERROR MESSAGE - " , error.message)
  }
}

  return (
    <div className="bg-richblack-700 rounded-md w-[80%] mx-auto py-6 pl-6 pr-10 ">
    <p className="text-richblack-5 font-semibold text-lg w-[90%] mx-auto">
      Profile Information
    </p>

    <form onSubmit={handleSubmit(submitProfileForm)}  className="w-[90%] mt-8 mx-auto mb-8 text-opacity-90">
      {/* first row  */}
      <div className=" w-full flex  items-center gap-x-4 ">
        <label className="w-[45%] flex flex-col font-semibold">
          First Name
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5 form-style"
            {...register("firstName"  , {required:true})}
            defaultValue={user?.firstName}
          />
          {errors.firstName && (
          <span className='mt-1 text-[12px] text-yellow-100'>
            Please Enter Your First Name
          </span>
        )}
        </label>
        

        <label className="w-[45%] flex flex-col font-semibold">
          Last Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5"
            {...register("lastName"  , {required:true})}
            defaultValue={user?.lastName}
          />
           {errors.lastName && (
          <span className='mt-1 text-[12px] text-yellow-100'>
            Please Enter Your Last Name
          </span>
        )}
        </label>
      </div>

      {/* second row  */}
      <div className=" w-full flex  items-center gap-x-4 mt-4">
        <label className="w-[45%] flex flex-col font-semibold">
          Date Of Birth
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5"
            {...register("dateOfBirth" , {
              required: {
                value:true,
                message: "Please enter your Date of Birth"
              },
              max: {
                value: new Date().toISOString().split("T")[0],
                message: "Date Of birth cannot be in future"
              },
            })}
            defaultValue={user?.additionalDetails?.dateOfBirth}
          />
          {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
        </label>

        <div className="w-[45%] flex flex-col">
          <label htmlFor="gender" className="">
            Gender
          </label>

          <select
            type= "text"
            name="gender"
            id="gender"
            className="mt-3 w-full bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5"
            {...register("gender" , {required :true})}
            defaultValue={user?.additionalDetails?.gender}
          >
            {genders.map( (ele , i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              )
            })}
          </select>
          {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Gender.
                </span>
              )}
        </div>
      </div>

      {/* third row  */}
      <div className=" w-full flex  items-center gap-x-4 mt-4">
        <label className="w-[45%] flex flex-col font-semibold">
          Contact Number
          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter Contact Number"
            className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5"
            {...register("contactNumber" ,{
              required:{
                value:true,
                message:"Please Enter Your contact Number"
              },
              maxLength: {value:12 , message:"Invalid Contact Number"},
              minLength:{value:10 , message:"Invalid Contact Number" },
               } )}
               defaultValue={user?.additionalDetails?.contactNumber}
          />
          {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
        </label>

        <label className="w-[45%] flex flex-col font-semibold">
          About
          <input
            type="text"
            name="about"
            id="about"
            placeholder="Enter About Yourself"
            className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5"
            {...register("about" , {required:true })}
            defaultValue={user?.additionalDetails?.about}
          />
          {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
        </label>
      </div>

      <div className="mt-8 w-full flex  gap-x-3 items-center justify-end ">
        <IconBtn
          text={"Cancel"}
          type={""}
          customClasses={"bg-richblack-500 h-fit text-richblack-5"}
          onclick={() => {
            navigate("/dashboard/my-profile")
          }}
          />
        <IconBtn
         text={"Save"}
         type={"submit"}
         customClasses={"bg-yellow-50 h-fit"}
         onclick={() => {}}
        />
      </div>
    </form>
  </div>

  )
}

export default EditProfile