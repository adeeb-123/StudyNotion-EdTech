import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { MdAdd } from "react-icons/md";
import { SubSectionModal } from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseAPI";
import { setCourse } from "../../../../../slices/courseSlice";

export const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async(sectionId) => {
  const result = await deleteSection({
    sectionId:sectionId,
    courseId:course._id,
    token,
  })
  if(result) {
    dispatch(setCourse(result))
  }
  setConfirmationModal(null);
  };
  const handleDeleteSubSection = async(subSectionId , sectionId) => {
    let courseId = course._id;
     const result = await deleteSubSection({
        subSectionId , sectionId , courseId
     }, token)
     if(result){
      // const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
      // const updatedCourse = {...course , courseContent : updatedCourseContent}
        dispatch(setCourse(result))
     }
     setConfirmationModal(null);
  }
  return (
    <div className="bg-richblack-700 rounded-lg w-full mt-3 px-8 py-3">
        {/* all sections  */}
      <div>
        {course?.courseContent.map((section) => (
          <details key={section._id} open>
            <summary className=" flex items-center justify-between border-b-2 border-b-richblack-300 px-2 py-3">
              <div className="flex items-center gap-x-3 text-lg border-b-1 border-b-richblack-300 ">
                <RxDropdownMenu />
                <p className="cursor-pointer">{section?.sectionName}</p>
              </div>

              <div className="flex items-center gap-x-2">
                <div>
                  <button
                    onClick={() =>handleEditSectionName(
                      section._id,
                      section.sectionName
                    )}
                    className="border-r-2 pr-2 mr-2 text-richblack-300"
                  >
                    <MdEdit />
                  </button>
                </div>

                <button
                  className="border-r-2 pr-2 text-richblack-300"
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2:
                        "Are you sure , all lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <MdDelete />
                </button>

                <button className="text-richblack-300">
                  <BiSolidDownArrow />
                </button>
              </div>
            </summary>
            {/* all subsections for  each section  */}
            <div>
              {section.subSections.length !== 0 && (
                
                section.subSections.map((data) => (
                <div
                  key={data._id}
                  className=" w-[90%] mx-auto flex items-center justify-between
                                 gap-x-3 text-richbalck-300 border-b-2 my-2 text-richblack-300"
                >

                  <div className="flex items-center gap-x-3 text-lg border-b-1 border-b-richblack-300 "
                   onClick={() => setViewSubSection(data)}>
                    <RxDropdownMenu />
                    <p className="text-white cursor-pointer">{data?.title}</p>
                  </div>

                  <div className="flex items-center gap-x-2 z-[10]" >
                    <button className="border-r-2 pr-2 text-richblack-300 z-[10]" 
                    onClick={() => setEditSubSection({...data , sectionId:section._id})} >
                        <MdEdit />
                    </button>

                    <button
                  className="border-r-2 pr-2 text-richblack-300"
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Lecture?",
                      text2:
                        "Are you sure , this lecture will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSubSection(data._id , section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <MdDelete />
                </button>
                  </div>

                </div>
              ))
              
              )}

              {/* add lecture btn     */}
             <div>
                <button className="text-yellow-50  flex items-center gap-x-3 text-lg mt-4 w-[90%] mx-auto" onClick={() => setAddSubSection(section._id)}>
                   <MdAdd />
                   <p>Add Lecture</p>
                </button>
             </div>
            </div>
          </details>
        ))}
      </div>

       {/* subsection modal  */}
       {addSubSection ? (<SubSectionModal
       modalData ={addSubSection}
       setModalData={setAddSubSection}
       add={true}/>) : 
        viewSubSection ? (<SubSectionModal
            modalData ={viewSubSection}
            setModalData={setViewSubSection}
            view={true}/>) :
        editSubSection ? (<SubSectionModal
            modalData ={editSubSection}
            setModalData={setEditSubSection}
            edit={true}/>) :
        (<div></div>)}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
