import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzpLogo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API , COURSE_VERIFY_API , SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token,courses , userDetails , dispatch , navigate) {
    const toastId = toast.loading("Loading...")
     try{

        //load script
        const res  = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("RazorPay SDK failed to Load");
            return
        }
     
        // initiate  the order 
        const orderResponse = await apiConnector("POST" , COURSE_PAYMENT_API , 
                                             {courses},
                                             {
                                                Authorization: `Bearer ${token}`,
                                             });
        console.log("orderResponse - " , orderResponse)

        if(!orderResponse?.data?.success){
            throw new Error(orderResponse.data.message)
        }

        ///options
        const options = {
            key: process.env.RAZORPAY_KEY || 'rzp_test_Be6Iaq6uBmBnHy' ,
            // rzp_test_M5QorwjSfrNS
            currency:orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`
            },
            handler: function(response) {
                 //send successfull mail
                sendPaymentSuccessfullEmail(response , orderResponse.data.message.amount , token)
                 //verify payment
                 verifyPayment({...response , courses} , token , dispatch , navigate  )
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed" , function(response){
           toast.error("Could not make Payment")
           console.log(response.error)
        })

     }catch(error){
         console.log("PAYMENT_API_ERROR - " , error.message)
         toast.error("Could not make Payment")
     }
     toast.dismiss(toastId)
}

async function  sendPaymentSuccessfullEmail(response , amount , token) {
      try{
           await apiConnector("POST" , SEND_PAYMENT_SUCCESS_EMAIL_API  , {
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount },
            {
                Authorization: `Bearer ${token}`,
            })
      }catch(error){
               console.log(" SEND_PAYMENT_SUCCESS_EMAIL_API_ERROR - " , error)
      }
}

async function verifyPayment(bodyData , token ,dispatch , navigate){
  const toastId = toast.loading("Verifying Payment");
  dispatch(setPaymentLoading(true));
  try{
    console.log("bodyData " , bodyData)
      const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData , {
        Authorization: `Bearer ${token}`,
      })

      console.log("COURSE_VERIFY_API  - " , response)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
      toast.success("Payment Successfull , you are added to the course")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
  }catch(error){
    console.log("PAYMENT_VERIFY_ERROR - " , error)
    toast.error("Could Not Verify Payment")
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}