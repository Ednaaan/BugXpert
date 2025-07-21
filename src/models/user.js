const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String
    },
    email: { type:String},
    password: {type : String},
    role : {
        type : String,
        eneum : ["Tester", "Developer", "Manager"],
        default: "Tester",
    },


}, {timestamps: true});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;