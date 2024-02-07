import React, { useState } from 'react'
import {Chart , registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables)

export const InstructorChart = ({instructorData}) => {
    const[currentChart, setCurrentChart] = useState("students")

    const getRandomColors = (numColors) => {
        let colors =[];
             for(let i=0 ; i<numColors ; i++) {
                const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
                ${Math.floor(Math.random()*256)})`
                 colors.push(color)
             }
             return colors;
    }

    // create data for students info 
         const chartDataforStudents = {
            labels: instructorData.map((course) => course.courseName),
            datasets :[
                {
                    data: instructorData.map((course) => course.totalStudentsEnrolled),
                    backgroundColor: getRandomColors(instructorData.length),
                }
            ]
         }
    //create data for income info
    const chartDataforIncome = {
        labels: instructorData.map((course) => course.courseName),
        datasets :[
            {
                data: instructorData.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(instructorData.length)
            }
        ]
     }
    //create options
    const options ={

    }
  return (
    <div className='bg-richblack-800 rounded-md w-[65%] p-4 min-h-[60vh]'>
        <p className='text-white font-semibold text-2xl'>Visualise</p>
        
        <div className='flex items-center gap-x-3 my-3'>
            <button
            className={`px-2 py-1 text-yellow-50 font-semibold rounded-md ${currentChart === "students" ? "bg-richblack-700" : "bg-none"}`}
            onClick={() => setCurrentChart("students")}>Student</button>
            
            <button
              className={`px-2 py-1 text-yellow-50 font-semibold rounded-md ${currentChart !== "students" ? "bg-richblack-700" : "bg-none"}`}
             onClick={() => setCurrentChart("income")}
            >Income</button>
        </div>

        <div className='w-full'>
            <Pie
                    data={currentChart === "students" ? chartDataforStudents : chartDataforIncome}
                    options={options}
                    className='w-full'
            />
        </div>
        </div>
  )
}
