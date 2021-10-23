const mongoose = require("mongoose")
const Project = require("./Projects")
const User = require("./Users")
const IssueHistory = require("./IssueHistory")
const Comments = require("./Comments")

let issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  startDate: {
    type: Date,
  },
  targetEndDate: {
    type: Date
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "IssueHistory"
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: [true, "Project cannot be empty"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  status: {
    type: String,
    enum: ["open", "closed"],
  },
  type: {
    type: String,
    enum: ["bugs/error", "feature"]
  }
}, { timestamps: true })

issueSchema.pre("remove", async function (next) {
  //find user from ref then remove Issue from Issues array in User model
  try {
    const user = await User.findById(this.createdBy)
    user.issues.remove(this._id)
    await user.save()
    const foundProject = await Project.findById(this.project)
    foundProject.issues.remove(this._id)
    await foundProject.save()
    await IssueHistory.remove({ _id: { $in: this.history } })
    await Comments.remove({ _id: { $in: this.comments } })
    return next()
  } catch (err) {
    return next(err)
  }
})

const Issue = mongoose.model("Issue", issueSchema)

module.exports = Issue