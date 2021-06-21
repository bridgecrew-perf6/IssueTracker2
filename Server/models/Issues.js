const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("./Users")

const issueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

issueSchema.pre("remove", async (next) => { 
    //find user from ref then remove Issue from Issues array in User model
    try {
        const user = await User.findOne(this.user)
        user.issues.remove(this._id)
        await user.save()
        return next()
    } catch (err) {
        return next(err)
    }
})

const Issue = mongoose.model("Issue", issueSchema)

module.exports = Issue