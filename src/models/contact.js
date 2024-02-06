const mongoose=require("mongoose");
const contactinfo=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String,
        unique:true,
    },
    Message:{
        type:String,
    }
});
const Contact=new mongoose.model("Contact",contactinfo);
module.exports=Contact;