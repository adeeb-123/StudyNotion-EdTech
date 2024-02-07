const  mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model("Contact" , contactSchema );