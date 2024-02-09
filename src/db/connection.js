const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://vidit0018:Gk95I8WbPmpiGsQO@sportify.nkdbgdb.mongodb.net/").then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("error cought",e);
})

module.exports=mongoose;




