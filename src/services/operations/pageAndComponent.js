import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
 
const {CATALOGPAGEDATA_API} = catalogData;
export const getCatalogData = async(categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = [];
  try{
     const response = await apiConnector("POST" , CATALOGPAGEDATA_API , {categoryId:categoryId,} );

     if(!response?.data?.success){
        throw new Error ("Could not frtch  category Page Data")
     }
    //  console.log("Res - " ,response?.data)
     result = response?.data

  }catch(error){
       console.log("CATALOG_PAGE_DATA_API_REPSONSE - " , error);
      toast.error(error.message)
       result = error?.response?.data
  }
  toast.dismiss(toastId)
  return result;
}
