import { RenderSteps } from "./RenderSteps"
import { PiLightningFill } from "react-icons/pi";

export default function AddCourse() {
    return(
        <>
          <div className="w-11/12 h-fit min-h-screen flex  gap-8  pt-12 pl-10">
            {/* left side  */}
            <div className="flex flex-col gap-y-4 w-[65%]">
                 <h1 className="text-2xl font-semibold text-richblack-5 text-left w-[80%]  mx-auto">Add Course</h1>
                 <div className="overflow-hidden">
                 <RenderSteps/>
                 </div> 
            </div>

            <div className="w-[35%] bg-richblack-700 px-3 py-4 rounded-lg h-fit" >
              <p className="text-xl font-semibold text-richblack-5 text-left w-full mx-auto flex items-center gap-x-2">
                 <PiLightningFill className="text-yellow-50 text-lg"/>
                <span>Course Upload Tips</span></p>
              <ul className="flex flex-col gap-y-2 mt-2 text-sm font-semibold list-disc ml-3" >
                  <li>Set the Course Price option or make it free.</li>
                  <li>Standard size for the course thumbnail is 1024x576.</li>
                  <li>Video section controls the course overview video.</li>
                  <li>Course Builder is where you create & organize a course.</li>
                  <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                  <li>Information from the Additional Data section shows up on the course single page.</li>
                  <li>Make Announcements to notify any important</li>
                  <li>Notes to all enrolled students at once.</li>
              </ul>
            </div>
          </div>
        </>
    )
}