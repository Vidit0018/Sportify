const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://chaudharyrajan387:S9CGsVUyaVv8tNYi@cluster0.uuuvt.mongodb.net/").then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("error cought",e);
})

module.exports=mongoose;




