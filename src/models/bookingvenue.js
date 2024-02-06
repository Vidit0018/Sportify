const mongoose=require("mongoose");
const bookingInfo=new mongoose.Schema({
    Contact:{
        type:Number,
    },
    Location: {
        type:String,
    },
    
    Sports:{
        type:String,
    },
    
    Name:{
        type:String,
    },
    Timing:{
        type:String,
    },
   Address:{
    type:String,
   },
   Image:{
    type:String,
   }

   
});
const booking=new mongoose.model("booking",bookingInfo);

module.exports=booking;
