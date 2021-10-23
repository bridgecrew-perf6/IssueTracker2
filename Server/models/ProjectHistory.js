const mongoose = require("mongoose")
const Project = require("./Projects")
const User = require("./Users")

let projectHistorySchema = new mongoose.Schema({
  property: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, { timestamps: true })

const ProjectHistory = mongoose.model("ProjectHistory", projectHistorySchema)

module.exports = ProjectHistory