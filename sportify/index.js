const express=require("express");
const app=express();
const multer=require("multer");
const path=require("path");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
const ejs_mate=require("ejs-mate");//for create templating.
app.engine("ejs",ejs_mate);
const bcrypt=require("bcryptjs");
let port=3000;
const Register=require("./src/models/register");
const Contact=require("./src/models/contact");
const venue=require("./src/models/venuelist");
const connection=require("./src/db/connection");
 app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
 })
//  multer ko implement krne ke liye
var storage=multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,"./public/assets")
  },
  filename:function(req,file,cb){
      let ext=path.extname(file.originalname)
      cb(null,Date.now()+ext);
  }

});
var upload=multer({
  storage:storage,
  fileFilter:function(req,file,callback){
      const allowedMimeTypes = ["image/jpg", "image/png"];
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      }
      else{
          console.log("only jpg and png file is accepted");
          callback(null,false);
      }
  },
  limits:{
      fileSize:1024*1024*2
  }
});
 app.get("/",(req,res)=>{
   res.render("Firstpage.ejs");
 })
 app.get("/signup",(req,res)=>{
   res.render("index.ejs");
 })
 app.post("/signup",async(req,res)=>{
       const register=new Register({
           Username:req.body.Username,
           Email:req.body.Email,
          Password:req.body.Password,
          
      })
      const registered=await register.save();
      res.send("you successfully registered");
  
  }
);
app.get("/signin",(req,res)=>{
  res.render("index.ejs");
})
app.post("/signin", async (req, res) => {
  try {
      const Username= req.body.Username;
      const Password = req.body.Password;
      // const Email=req.body.Email;

      // Check if Email and Password are present in the request body
      if (!Username || !Password) {
          return res.status(400).send("Email and Password are required");
      }

      const user = await Register.findOne({ Username });

      // Check if the user exists in the database
      if (!user) {
          return res.status(404).send("User not found");
      }

      const isMatch = await bcrypt.compare(Password, user.Password);

      // Check if the passwords match
      if (isMatch) {
        console.log({Password,Username});
          res.render("home.ejs",{user});
      } else {
          res.status(401).send("Invalid Username and password");
      }
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Internal Server Error");
  }
});
app.post("/contact",async(req,res)=>{
  const contact=new Contact({
    Name:req.body.Name,
    Email:req.body.Email,
    Message:req.body.Message,
  })
  const contacted=await contact.save();
  res.send("thank you for reaching us")
})


 app.get("/editprofile/:id", async (req, res) => {
   try {
    let { id } = req.params;
    console.log(id);
    let editdata = await Register.findById(id);

    if (!editdata) {
      return res.status(404).send('User not found'); // Handle if user is not found
     }

     res.render("profile.ejs", { editdata });
       } catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
   }
 });
app.put("/editprofile/:id",upload.single('image'),async(req,res)=>{
  const { id } = req.params;
  const { Sports } = req.body; 

  const imagepath1= '/assets/' + req.file.filename;
  console.log(imagepath1);
 
  // Assuming you get the sport from the request body

    // Logic to set the image path based on the selected sport
    let imagePath;
    switch (Sports) {
        case 'Cricket':
            imagePath = '/assets/cricket.jpg';
            break;
        case 'Badminton':
            imagePath = '/assets/batminton.jpg';
            break;
        case 'Football':
            imagePath = '/assets/football.jpg';
            break;
        default:
            imagePath = '/assets/default.jpg'; // Set a default image if needed
    }

  try {
    const updatedData = {
      Birthday: req.body.Birthday,
      Detail: req.body.Detail,
      Sports:Sports,
      Contact: req.body.Contact,
      Location:req.body.Location,
      Image:imagePath,
      Image1:imagepath1,
    
    };

    const user = await Register.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
     res.send("message is not conveying ,sorry");
    }
    
    res.render("home.ejs",{user});

   
  }
  catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  
});


app.get("/venues",async(req,res)=>{
  const newvenue= await venue.find({});
  res.render("venues",{newvenue});
 
})
app.get("/listing",async(req,res)=>{
 const user=await Register.find({});
 console.log(user);
 res.render("listing.ejs",{user});
})
 app.get("/register-venue",(req,res)=>{
  res.render("register-venue.ejs");
 })
 app.post("/register-venue",async(req,res)=>{
  const { Sports } = req.body; // Assuming you get the sport from the request body

  // Logic to set the image path based on the selected sport
  let imagePath;
  switch (Sports) {
      case 'Cricket':
          imagePath = '/assets/st2.png';
          break;
      case 'Badminton':
          imagePath = '/assets/st4.png';
          break;
      case 'Football':
          imagePath = '/assets/st1.png';
          break;
      default:
          imagePath = '/assets/st3.png'; // Set a default image if needed
  }
const Venue = new venue({
  Name:req.body.Name,
    Contact: req.body.Contact,
    Timing: req.body.Timing,
    Sports:Sports,
    Address: req.body.Address,
    Location:req.body.Location,
    Image:imagePath,
  });
  try {
    const bookedVenue = await Venue.save();
   res.render("venues.ejs");
    
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});
app.get("/delhi",async(req,res)=>{
  const user=await Register.find({Location:"Delhi"});
  console.log(user);
  res.render("listing.ejs",{user});
})
app.get("/kolkata",async(req,res)=>{
  const user=await Register.find({Location:"kolkata"});
  console.log(user);
  res.render("listing.ejs",{user});
})
app.get("/cricket",async(req,res)=>{
  const user=await Register.find({Sports:"cricket"});
  console.log(user);
  res.render("listing.ejs",{user});
})
app.get("/football",async(req,res)=>{
  const user=await Register.find({Sports:"football"});
  console.log(user);
  res.render("listing.ejs",{user});
})
app.get("/bookedvenue",(req,res)=>{
  res.render("bookedvenue.ejs");
})
app.get("/bookvenue/:id",async(req,res)=>{
  let {id}=req.params;
  const newuser=await venue.findById(id);
  res.render("bookedvenue.ejs",{newuser});
})
 