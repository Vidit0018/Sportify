const mongoose=require("mongoose");
const venueInfo=new mongoose.Schema({
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
const venue=new mongoose.model("venue",venueInfo);

module.exports=venue;


