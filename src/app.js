const express = require('express');
const connectDB = require("./config/database");
const app = express();








 app.use(express.json());


const router = require('./routes/bugRoutes');
const userRouter = require('./routes/userRoutes');

 app.use("/", router);
 app.use("/", userRouter);









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
