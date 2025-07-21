const express = require('express');
const Bug = require("../models/bug");

const auth = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/createBug", auth, async (req,res) =>{
    try {
        const bug = new Bug({

            ...req.body,
            reportedBy: req.user.id

        });

        await bug.save();
        res.status(201).json({message: "Bug created Successfully"});
    } catch (err) {
        res.status(500).send("error on creating the bug: " + err.message);
        
    }
});

router.get("getAllBugs", auth, async (req,res) => {
    try {
        const bug = await Bug.find().populate("reportedBy assignedTo", "name email");
    res.json(bug);
    } catch (err) {
        res.status(501).send("Error on fetching the bugs:" + err.message);
        
    }
});


router.put("/updateBug/:id", auth, async (req,res) =>{
    try {
        const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!bug){
        return res.status(404).send("Bug not found");
    }
    res.json({
        message: "Bug Updated". bug
    });
    } catch (err) {
        res.status(500).send("error updating the bug:" + err.message);
    }
});


router.delete("deleteBug/:id", auth, async (req,res)=>{
    try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).send("Bug not found");
    res.json({ message: "Bug deleted" });
  } catch (err) {
    res.status(500).send("Error deleting bug: " + err.message);
  }
});

module.exports = router;




