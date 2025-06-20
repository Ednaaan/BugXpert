const express = require('express');


const app = express();
app.use((req,res)=>{
    res.send("Hello from the server Guys wooooooooooo........");

});
app.listen(5000, ()=>{
    console.log("Server is running on port 6000");
});