import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { FiUpload } from 'react-icons/fi';
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';


const ChangeProfilePicture = () => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)

    const dispatch  = useDispatch();
    const fileInputRef  = useRef(null);

    const [imageFile ,setImageFile] = useState(null);
    const [previewSource , setPreviewSource] = useState(null);
    const [loading ,setLoading] = useState(false)


    function handleFileChange(e) {
       const file  = e.target.files[0]
       //    console.log(file)
       if(file) {
        setImageFile(file)
        previewFile(file)
       }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    function handleClick() {
    fileInputRef.current.click()
    console.log("token here - " , token)
    }

    function handleFileUpload(){
         try{
            console.log("Uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture" , imageFile)
            // console.log(formData)
            dispatch(updateDisplayPicture(token , formData)).then(() => {
                setLoading(false)
            })
         }catch(err){
            console.log("ERROR MESSAGE - " , err.message)
         }
    }

    useEffect( () => {
        if(imageFile){
        previewFile(imageFile)
    }}, [imageFile])
  return (
    <div className="bg-richblack-700 rounded-md w-[80%] mx-auto py-4 pl-6 pr-10 flex  gap-x-6">
        <img
          src={previewSource || user?.image}
          alt={`profile - ${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div>
          <p className="text-richblack-5 font-semibold text-lg">
            Change Profile Picture
          </p>
          <div className="flex items-center gap-x-4  mt-3">
            <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            accept="image/png, image/gif, image/jpeg"
            />

            <button
            onClick={handleClick}
            disabled={loading}
            className='cursor-pointer rounded-md bg-richblack-600 py-2 px-5 font-semibold text-richblack-50'
            >
             Select
            </button>

            <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}
            customClasses={"bg-yellow-50 font-semibold"}>
               {!loading && (
                 <FiUpload className='text-lg text-richblack-900'/>
               ) }
            </IconBtn>

          </div>
        </div>
      </div>
  )
}

export default ChangeProfilePicture