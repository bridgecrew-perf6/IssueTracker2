const mongoose = require("mongoose")

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports.User = require("./Users")
module.exports.Issue = require("./Issues")
module.exports.IssueHistory = require("./IssueHistory")
module.exports.Project = require("./Projects")
module.exports.ProjectHistory = require("./ProjectHistory")
module.exports.Comment = require("./Comments")