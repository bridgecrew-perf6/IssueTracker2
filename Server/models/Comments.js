const mongoose = require("mongoose")
const Issue = require("./Issues")

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Comment cannot be empty"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment