import toast from "react-hot-toast";
import { categories, courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    CATEGORIES_API,
} = categories

const {
    COURSE_DETAILS_API,
    GET_ALL_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints



export const getAllCourses = async() =>{
    const toastId = toast.loading("Loading...")
    let result =[]
    try{
    const response  = await apiConnector(
        "GET",
        GET_ALL_COURSE_API,
        {}
        )

        console.log(" GET_ALL_COURSE_API_RESPONSE - " , response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
        toast.success("Courses fetched Successfully")
    }catch(error){
           console.log(" GET_ALL_COURSE_API_RESPONSE - " , error)
           toast.error("Can't fetch data")
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

export async function getAllInstructorCourses(token ) {
   
    let result = []
    try{
      
        const response  = await apiConnector(
            "GET",
             GET_ALL_INSTRUCTOR_COURSES_API,
             null,
             {
                Authorization: `Bearer ${token}`,
             }
        )
        
        console.log("Instructor courses - " , response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        //  toast.success("fetched")
        result = response.data.data
    }catch(error){
         console.log(" GET_ALL_INSTRUCTOR_COURSES_API_RESPONSE - "  , error)
          toast.error("Could not get Enrolled Courses")
    }
    
    return result
    }

export const fetchCourseCategories =async() => {
    let result = []
    try{
       const response = await apiConnector(
        "GET", CATEGORIES_API
        )
        console.log(" COURSE_CATEGORIES_API_RESPONSE - " , response)
        if(!response?.data?.success){
            throw new Error("Couldn't fetch categories")
        }
       result  =  response?.data?.allCategories
    }catch(error){
        console.log(" COURSE_CATEGORIES_API_RESPONSE - " , error)
        toast.error(error.message)
    }
    return result
}

//add Course 
export const addCourseDetails = async(data,token) => {
  let result = null;
  const toastId = toast.loading("Loading...")
  try{
   const response = await  apiConnector("POST" , CREATE_COURSE_API , data , {
    "Content-Type" : "multipart/form-data",
    Authorization : ` Bearer ${token}`
   })
   console.log("ADD_COURSE_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("Could not Updated Course Details")
     }
     toast.success("Course created Successfully")
     result = response?.data?.data?.newCourse
  }catch(error){
    console.log("CREATE_COURSE_API_RESPONSE  - " , error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit course Details 
export const editCourseDetails = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try{
     const response  = await apiConnector("POST" , EDIT_COURSE_API , data ,{
        "Content-Type" : "multipart/form-data",
        Authorization : ` Bearer ${token}`
     })
     console.log("EDIT_COURSE_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("COuld not Updated Course Details")
     }
     toast.success("Course Updated Successfully")
     result = response?.data?.data
    }catch(error){
       console.log("EDIT_COURSE_API_RESPONSE  - " , error)
       toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create a section
export const createSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try{
     const response  = await apiConnector("POST" , CREATE_SECTION_API , data ,{
        Authorization : ` Bearer ${token}`
     })
     console.log("CREATE_SECTION_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("COuld not Add Section")
     }
     toast.success("Section Added Successfully")
     result = response?.data?.updatedCourse
    }catch(error){
       console.log("CREATE_SECTION_API_RESPONSE  - " , error)
       toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update a section
export const updateSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try{
     const response  = await apiConnector("POST" , UPDATE_SECTION_API , data ,{
        Authorization : ` Bearer ${token}`
     })
     console.log("UPDATE_SECTION_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("COuld not Update Section")
     }
     toast.success("Section Updated Successfully")
     result = response?.data?.data?.course
    }catch(error){
       console.log(" UPDATE_SECTION_API_RESPONSE  - " , error)
       toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create a subsection
export const createSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try{
     const response  = await apiConnector("POST" , CREATE_SUBSECTION_API , data ,{
        Authorization : ` Bearer ${token}`
     })
     console.log("CREATE_SECTION_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("COuld not Add SubSection")
     }
     toast.success("Lecture Added Successfully")
     result = response?.data?.data?.updatedCourse
    }catch(error){
       console.log("CREATE_SUBSECTION_API_RESPONSE  - " , error)
       toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update a subsection
export const updateSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try{
     const response  = await apiConnector("POST" , UPDATE_SUBSECTION_API , data ,{
        Authorization : ` Bearer ${token}`
     })
     console.log("UPDATE_SUBSECTION_API_RESPONSE  - " , response)
     if(!response?.data?.success){
        throw new Error("COuld not Update SubSection")
     }
     toast.success("Lecture Updated Successfully")
     result = response?.data?.data?.updatedCourse
    }catch(error){
       console.log(" UPDATE_SUBSECTION_API_RESPONSE  - " , error)
       toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a section
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data?.updatedCourse
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // delete a subsection
  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data?.updatedCourse
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

  // get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }
  

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }
  
  // create a rating for course
  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }