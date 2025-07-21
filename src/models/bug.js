const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },

    status: {
        type:String,
        enum: ['Open', 'InProgress', 'Resolved', 'Solved'],
        default: 'Open'
    },
    severity: {
        type: String,
        enum:['Low','Medium','High'],
        default: 'Low'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type:Date,
        default: Data.now
    },
});

const BugModel = mongoose.model("Bug", bugSchema);
module.exports = BugModel;