import React, { useEffect, useState } from 'react'
import Footer from '../components/core/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogData } from '../services/operations/pageAndComponent';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { CourseCardTemplate } from '../components/core/Catalog/CourseCardTemplate';

export const Catalog = () => {
    const {catalogName} =  useParams();
    const  [catalogPageData , setCatalogPageData] = useState(null)
    const  [categoryId , setCategoryId] = useState("")
    const[active , setActive] = useState(1);

    useEffect(() => {
        const getCategories = async() => {
           const res = await apiConnector("GET" , categories.CATEGORIES_API);
          //    console.log("Response - " , res)
        //    console.log(res?.data?.allCategories)
           const category_id = res?.data?.allCategories.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        //    console.log("CategoryID - " , category_id)
           setCategoryId(category_id)
        }

        getCategories();
    } , [catalogName]);

    useEffect(() => {
       const getCategoryDetails = async() =>{
        try{
            const res  = await getCatalogData(categoryId);
            console.log("PRINTING RES - " , res)
            setCatalogPageData(res);
        }catch(error){
             console.log(error)
        }
       }
       if(categoryId){
        getCategoryDetails();
       }
    } , [categoryId])
  return (
    <div className=' w-screen min-h-screen  '>
        <div className='w-full bg-richblack-800 py-12 px-32'>
            <p className='text-richblack-100'>{'Home / Catalog / '}<span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <p className='text-2xl text-richblack-5 font-semibold mt-5'>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p className='mt-2 text-richblack-100'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div >
            {/* section-1  */}
            <div className='pl-32'>
                <div className='w-full text-richblack-25 text-3xl mt-10 font-semibold'>Courses to get you started</div>
                {/* tabs */}
                <div className='flex gap-x-5  mt-3 border-b-2 border-b-richblack-800  text-richblack-100 font-semibold items-center'>
                    <p className={` h-full cursor-pointer pb-1  ${active===1 ? "border-b-2 border-b-yellow-50 text-yellow-50" : "border-none"}`} onClick={() => setActive(1)}>Most Popular</p>
                    <p className={` h-full cursor-pointer pb-1 ${active===2? "border-b-2 border-b-yellow-50 text-yellow-50" : "border-none"}`} onClick={() => setActive(2)}>New</p>
                </div>

                <div>
                  <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/> 
                </div>
            </div>

            {/* section-2  */}
            <div className='pl-32'>
            <div className='w-full text-richblack-25 text-3xl mt-10 font-semibold'>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </div>

            {/* section-3  */}
            <div>
            <div className='w-full text-richblack-25 text-3xl mt-10 font-semibold pl-32'>Frequently Bought </div>
               <div className='py-8'>
                       <div className='flex items-center flex-wrap w-[95%] ml-32 gap-x-[-2rem] gap-y-6 py-6 bg- '>
                           {
                            catalogPageData?.data?.mostSellingCourses.slice(0,4)
                            .map((course, index) => (
                                <CourseCardTemplate course={course} key={index}  Height={"h-[250px]"} />
                            ))
                           }
                       </div>
               </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
