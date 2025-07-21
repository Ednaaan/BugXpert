const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// const bugRoutes = require("./routes/bugRoutes");





 app.use(express.json());

 app.post("/signUp", async (req, res)=>{
  const {name, email, password, role} = req.body;

  if(!name || !email || !password || !role) {
    return res.status(400).send("All fields are required");
  }

  try {
    const existUser = await User.findOne({email});
    if(existUser) return res.status(400).send("User already exist");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password : hashedPassword, role});
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
    
  }
 });


 app.post("/signIn", async (req, res) =>{
  const {email,password} = req.body;

  if(!email || !password) {
    return res.status(400).send("Email and Password are required");
  }
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).send("User not found");

   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({message : "Login Successfully: " , token});
  } catch (err) {
    res.status(500).send("Error logging in : " + err.message);
    
  }

 });


 app.post("/signOut", (req, res) => {
  res.status(200).send("User Signed out successfully");
 });







connectDB()
 .then(() => {
    console.log("Database connection established...........");
    app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});
 })
  .catch((err) => {
    console.error("Database cannot be connected....");
  });
