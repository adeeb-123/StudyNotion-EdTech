
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import {profileEndpoints} from "../apis"


const  {
    GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;

export async function getUserEnrolledCourses(token) {
const toastId = toast.loading("Loading...")
let result = []
try{
  
    const response  = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
         null,
         {
            Authorization: `Bearer ${token}`,
         }
    )
    console.log("GET_USER_ENROLLED_COURSES_API_RESPONSE - ", response)
    
    if(!response.data.success){
        throw new Error(response.data.message)
    }
    result = response.data.data
}catch(error){
     console.log("GET_USER_ENROLLED_COURSES_API_RESPONSE - "  , error)
      toast.error("Could not get Enrolled Courses")
}
toast.dismiss(toastId)
return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result =[];
    try{
            const response = await apiConnector("GET" , profileEndpoints.GET_INSTRUCTOR_DATA_API , null ,
                {
                    Authorization: `Bearer ${token}`,
                 }
             )

             console.log("GET_INSTRUCTOR_DATA_API _RESPONSE - " , response);
             result = response?.data?.courses
    }catch(error){
        console.log("GET_INSTRUCTOR_API ", error);
            toast.error("Could not get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
}
