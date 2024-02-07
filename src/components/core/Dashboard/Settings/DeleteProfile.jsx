import React, { useState } from 'react'
import ConfirmationModal from '../../common/ConfirmationModal'
import {MdDelete} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../../../../services/operations/settingsAPI'

const DeleteProfile = () => {
    const [confirmationModal , setConfirmationModal] = useState(null)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleDeleteAccount() {
        try{
              dispatch(deleteProfile(token , navigate))
        }catch(error){
            console.log("ERROR - " , error.message)
        }
    }
  return (
   <div>
       <div className=" rounded-md w-[80%] mx-auto py-6 pl-6 pr-10 bg-[#cd3340]  bg-opacity-30 flex items-center gap-x-6">
           <div className="rounded-full bg-[#7a2020] bg-opacity-50 h-[50px] w-[50px] flex justify-center items-center ">
                    <MdDelete fontSize={26} className="text-[#a23131]"/>
           </div>

           <div>
                   <p className="text-richblack-5 font-semibold text-lg opacity-100">Delete Account</p>
                   <p className="mt-2 text-richblack-5 opacity-80 font-semibold">Would you like to Delete Account ?</p>
                   <p className="mt-1 text-richblack-5 opacity-80 font-semibold">This account contains Paid Courses. Deleting your account <br/> will remove all the contain associated with it.</p>

                      <button
                      onClick={() => setConfirmationModal({
                        text1:"Would you like to Delete Account ?",
                        text2:"This account contains Paid Courses. Deleting your account will remove all the contain associated with it.",
                        btn1Text:"Delete Account",
                        btn2Text:"Cancel",
                        btn1Handler: () => {handleDeleteAccount()},
                        btn2Handler: () =>  setConfirmationModal(null)
                      })}
                      >
                              <p className="text-md italic font-semibold text-[17px] mt-2 text-[#ff2c2c] cursor-pointer">I want to delete my account.</p>
                      </button>
                   
           </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
   </div>

  )
}

export default DeleteProfile