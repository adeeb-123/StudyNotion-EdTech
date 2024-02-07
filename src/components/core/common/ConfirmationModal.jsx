import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-richblack-5 w-screen h-[calc(100vh-3.5rem)] absolute top-0 left-0 bg-white bg-opacity-10 flex justify-center items-center overflow-hidden'>
           <div className='bg-richblack-800 h-fit min-h-[200px] w-[600px] flex flex-col gap-2 px-6 py-4 rounded-md'>
            <p className='text-richblack-5 font-semibold text-2xl'>{modalData.text1}</p>
            <p className='text-richblack-100 font-semibold text-base'>{modalData.text2}</p>
            
            <div className='flex gap-x-4 mt-6'>
                    <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} customClasses={"bg-yellow-50"}/>
                    <button onClick={modalData?.btn2Handler} className='bg-richblack-100 text-black px-4 py-2 rounded-md text-[14px]'>
                            {modalData?.btn2Text}
                    </button>
            </div>

           </div>
    </div>
  )
}

export default ConfirmationModal