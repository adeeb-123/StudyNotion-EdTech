import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteCourse, getAllInstructorCourses } from '../../../services/operations/courseAPI';
import { COURSE_STATUS } from '../../../utils/constants';
import { MdVerified } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import ConfirmationModal from '../common/ConfirmationModal';
const MyCourses = () => {
  
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [enrolledCourses , setEnrolledCourses] = useState(null);
    const [loading , setLoading] = useState(false);
    const[confirmationModal , setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async() => {
        try{
          const instructorId  = user._id
          const response = await getAllInstructorCourses(token , instructorId );
          // console.log("Courses - " ,response)
          setEnrolledCourses(response)
        }catch{
            console.log("Unable to fetch Enrolled Courses")
        }
    }
    useEffect(() => {
         
          getEnrolledCourses();
    },[]);

    const handleCourseDelete = async(courseId) => {
       setLoading(true);

       await deleteCourse({courseId:courseId} , token);

       const instructorId  = user._id
       const result =  await getAllInstructorCourses(token , instructorId );
       if(result){
        setEnrolledCourses(result);
       }
       setConfirmationModal(null);
       setLoading(false)
    }
  return (
    <div className='text-white w-[95%] mx-auto'>

       <div className='text-white text-3xl font-inter flex w-full items-center justify-between px-2 mt-8'>
        <p>My Courses</p>
        <button className='flex items-center gap-x-1 text-lg bg-yellow-50 py-2 px-4 rounded-lg font-inter text-black z-[150]'
        onClick={() => navigate("/dashboard/add-course")}>
        <IoIosAdd />
        <p>New</p>
        </button>
       </div>

        {
          !enrolledCourses ? ( <div className='w-full text-xl text-center '>Loading...</div>) 
          : !enrolledCourses.length ? (<p>You have not Created  any course yet</p>) 
          : (<div className='w-full text-richblack-900 border-2 border-richblack-700 rounded-lg mt-10'>
                 <div className='w-full mt-4 border-b-2 border-b-richblack-700 text-richblack-300 flex items-center justify-between px-3'>
                  <p className='w-[60%]'>Course Name</p>
                  <p>Duration</p>
                  <p>Price</p>
                  <p>Actions</p>
                 </div>
                 {/* CardsData  */}
                 {
                  enrolledCourses.map((course , index) => (
                    <div key={index} className=' my-4 p-6 text-white flex items-center justify-between'>

                      <div className='flex items-center gap-x-8 w-[65%] '>
                        <img src={course.thumbnail} alt=""  className='h-[200px] aspect-video rounded-md'/>
                        <div className='flex flex-col gap-y-2'>
                          <p className='text-2xl text-white font-semibold font-inter'>{course.courseName}</p>
                          <p className='text-richblack-300 w-full'>{course.courseDescription}</p>
                          {
                            course?.updatedAt && (
                              <p> Created: {course?.updatedAt.split(":").at("0")}</p>
                            )
                          }
                          <div className={`rounded-2xl px-2 py-2 flex items-center bg-richblack-600 justify-center gap-x-1 max-w-[100px] ${course?.status === COURSE_STATUS.PUBLISHED ? "text-yellow-50" : "text-pink-500 "}`}>
                              {course?.status === COURSE_STATUS.PUBLISHED ?  (<MdVerified className='text-2xl' />) : (<GoClockFill />)}
                            <p>{course.status}</p>
                          </div>
                           
                        </div>
                      </div>

                      <div className='w-[10%] text-richblack-300 text-center'>
                          {!course?.totalDuration ? <p>100hrs</p> : <p>{course?.totalDuration}</p>}
                        </div>

                     <div className='w-[10%] text-richblack-300 text-center'>
                      {course?.price}Rs
                     </div>

                     <div className='w-[10%] text-richblack-300 flex items-center gap-x-2 text-center text-lg'> 
                     <button className='flex justify-center text-center w-[50%] ' disabled={loading} onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}>
                     <MdEdit />
                     </button>
                     <button className='flex justify-center w-[50%]' disabled={loading} onClick={() => setConfirmationModal({
                      text1:"Do You want to delete this Course?",
                     text2:"All Data related to this course will be Deleted",
                     btn1Text:"Delete",
                     btn2Text:"Cancel",
                     btn1Handler: !loading ? () => handleCourseDelete(course?._id) : () => {},
                     btn2Handler: !loading ? () => setConfirmationModal(null) : () => {}

                     })}>
                      <AiFillDelete/>
                     </button>
                     </div>
                        
                    </div>
                  ))
                 }
          </div>)

        }

        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default MyCourses