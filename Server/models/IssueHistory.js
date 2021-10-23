const mongoose = require("mongoose")
const Project = require("./Projects")
const User = require("./Users")

let issueHistorySchema = new mongoose.Schema({
  property: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, { timestamps: true })

const IssueHistory = mongoose.model("IssueHistory", issueHistorySchema)

module.exports = IssueHistory