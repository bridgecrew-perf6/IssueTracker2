const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("Connection Open")
    })
    .catch(err => {
        console.log(err)
    })

module.exports.User = require("./Users")
module.exports.Issue = require("./Issues")
module.exports.IssueHistory = require("./IssueHistory")
module.exports.Project = require("./Projects")
module.exports.ProjectHistory = require("./ProjectHistory")
module.exports.Comment = require("./Comments")