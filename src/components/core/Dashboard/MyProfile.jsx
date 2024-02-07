import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import {LiaEditSolid} from "react-icons/lia"
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-11/12 h-fit min-h-screen flex flex-col gap-8  pt-12 pl-10">
      <h1 className="text-2xl font-semibold text-richblack-5 text-left w-[80%]  mx-auto">My Profile</h1>

      {/* section1  */}
      <div className="bg-richblack-700 rounded-md w-[80%] mx-auto py-4 pl-6 pr-10 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <img
            src={user?.image}
            alt={`profile- ${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div >
            <p className="font-bold" onClick={() => console.log(user)}>{user?.firstName + " " + user?.lastName}</p>
            <p className="text-richblack-300 ">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text={"Edit"}
          customClasses={"bg-yellow-50 h-fit"}
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <LiaEditSolid />
        </IconBtn>
      </div>

      {/* section2  */}
      <div  className="bg-richblack-700 rounded-md w-[80%] mx-auto py-4 pl-6 pr-10 ">
        <div className="w-full flex justify-between">
          <p className="font-bold">About</p>
          <IconBtn
            text="Edit"
            customClasses={"bg-yellow-50"}
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            >
            <LiaEditSolid />
          </IconBtn>
        </div>

        <p className="text-richblack-300 mt-1">{user?.additionalDetails?.about ?? "Write About Yourself"}</p>
      </div>

      {/* section3  */}
      <div  className="bg-richblack-700 rounded-md w-[80%] mx-auto py-4 pl-6 pr-10 ">
        <div className="w-full flex justify-between">
          <p className="font-bold">Personal Details</p>
          <IconBtn
            text="Edit"
            customClasses={"bg-yellow-50"}
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            >
            <LiaEditSolid />
          </IconBtn>
        </div>

        <div className="w-full grid grid-cols-2 gap-y-4 mt-4">
          <div>
            <p className="font-semibold ">First Name</p>
            <p className="text-richblack-300">{user?.firstName}</p>
          </div>

          <div>
            <p className="font-semibold ">Last Name</p>
            <p className="text-richblack-300">{user?.lastName}</p>
          </div>

          <div>
            <p className="font-semibold ">Email</p>
            <p className="text-richblack-300">{user?.email}</p>
          </div>

          <div>
            <p className="font-semibold ">Gender</p>
            <p className="text-richblack-300">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>

          

          <div>
            <p className="font-semibold ">Phone Number</p>
            <p className="text-richblack-300">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
   
          <div>
            <p className="font-semibold ">Date Of Birth</p>
            <p className="text-richblack-300">{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
          </div>

        </div>


      </div>
    </div>
  );
};

export default MyProfile;
