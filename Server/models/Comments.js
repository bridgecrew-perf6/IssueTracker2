const mongoose = require("mongoose")
const Issue = require("./Issues")

const commentSchema = new mongoose.Schema({
  text: String,
  createdBy: {
    type: mongoose.Schema.Types.Object,
    ref: "User"
  }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment