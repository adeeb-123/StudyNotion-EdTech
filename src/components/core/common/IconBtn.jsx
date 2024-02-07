import React from 'react'

const IconBtn = (
    {
        text,
        onclick,
        children,
        disabled,
        outline=false,
        customClasses,
        type
    }
) => {
  return (
   <button 
   disabled={disabled}
   onClick={onclick}
   
   id='submitButton'
   className={`text-black px-4 py-2 rounded-md text-[14px] flex items-center justify-center gap-x-1 ${customClasses}`}
   >
    {
        children ? (
             <>
             <span >{text}</span>
             {children}
            </>
        ) : (text)
    }
   </button>
  )
}

export default IconBtn