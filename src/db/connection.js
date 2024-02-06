const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Info").then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("error cought",e);
})

module.exports=mongoose;