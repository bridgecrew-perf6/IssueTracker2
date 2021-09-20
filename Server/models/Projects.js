const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Name for project is required"],
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
    },
    startDate: {
        type: Date,
    },
    targetEndDate: {
        type: Date,
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }]


}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema)

module.exports = Project