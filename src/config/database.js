const mongoose = require('mongoose');


const connectDB = async() => {
    await mongoose.connect("mongodb+srv://namastenode66:ExytrPIAEjvvDs9J@bugxpertproject.fdespfv.mongodb.net/bugXpert");

}

module.exports = connectDB;
