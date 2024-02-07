import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../common/IconBtn";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/settingsAPI";
const ChangePassword = () => {

  const {token} = useSelector((state) => state.auth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const submitPasswordForm = async(data) => {
    try{
          await changePassword(token , data)
    }catch(error){
         console.log(error.message)
    }
  }


  return (
    <div className="bg-richblack-700 rounded-md w-[80%] mx-auto py-6 pl-6 pr-10 ">
      <p className="text-richblack-5 font-semibold text-lg w-[90%] mx-auto">
        Change Password
      </p>

      <form className="w-[90%] mt-8 mx-auto mb-8 text-opacity-90" onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="flex items-center w-full gap-x-6">
            <label className="w-[45%] flex flex-col font-semibold relative">
              Current Password
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter old Password"
                className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5 "
                {...register("oldPassword", { required: true })}
              />
              <span className="absolute top-12 right-2"
              onClick={() => setShowOldPassword((prev) => !prev)}>
                {showOldPassword ? (
             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
              </span>
              {errors.oldPassword && (
                <span>
                  Please enter your Current Password
                </span>
                )}
            </label>

            <label className="w-[45%] flex flex-col font-semibold relative">
              New Password
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="text-richblack-5 mt-3 bg-richblack-500 px-2 py-2 rounded-md border-b-2 border-b-richblack-5 "
                {...register("newPassword", { required: true })}
              />
              <span className="absolute top-12 right-2"
              onClick={() => setShowNewPassword((prev) => !prev)}>
                {showNewPassword ? (
             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
              </span>
              {errors.newPassword && (
                <span>
                  Please enter your Current Password
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
  );
};

export default ChangePassword;
