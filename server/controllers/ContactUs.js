const Contact = require("../models/ContactUs")
const mailSender  = require("../utils/mailSender")


exports.contactUs = async(req , res) => {
    try{
        // fetch data 
        const {email , firstname , lastname , message , phoneNo}  = req.body;

        // validate 
        if(!email || !firstname || !lastname || !message || !phoneNo ){
            return res.status(400).json({
                success:false,
                message:"Please Enter All Fields"
            })
        }

        // entry in db 
       const response =  await Contact.create({
            email ,
            firstname ,
            lastname ,
            message ,
            phoneNo
        })
    console.log(response)

        //mail  send 
        const mailResponse = await mailSender(email , 
            "Welcome to StudyNotion",
            "We have Got your Query , We will Contact you soon")


        //mail send to inform you  
        await mailSender("fuzailahmad2605@gmail.com" ,
                         "Someone Visits StudyNotion",
                         `Hello Someone Contacted You , Please Check
                         Name - ${firstname}
                         Email- ${email}
                         Message-${message}`)

      return res.status(200).json({
        success:true,
        message:"Contacted Successfully",
        response,
      })


    }catch(e){
           return res.status(500).json({
            success:false,
            message:e.message
           })
    }
}