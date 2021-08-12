const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Open")
    })
    .catch(err => {
        console.log(err)
    })

module.exports.User = require("./Users")
module.exports.Issue = require("./Issues")
module.exports.Project = require("./Projects")