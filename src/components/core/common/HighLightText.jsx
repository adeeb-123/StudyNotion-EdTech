import React from 'react'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-gradient-to-br  from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text '>
        {" "}
        {text}
        {" "}<br/>
    </span>
  )
}

export default HighLightText