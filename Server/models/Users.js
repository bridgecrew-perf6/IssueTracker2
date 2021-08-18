const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is requied"]
    },
    password: {
        type: String,
        required: [true, "Password is requied"]
    },
    email: {
        type: String,
        required: [true, "Email is requied"]
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }]

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    //use bcrpy to hash password before saving onto the database
    try {
        if (!this.isModified("password")) {
            next()
        }
        const hashedPassword = await bcrypt.hash(this.password, 12)
        this.password = hashedPassword
        return next()
    } catch (e) {
        return next(e)
    }
})


userSchema.methods.validatePassword = async function (password, next) {
    try {
        const isValidated = await bcrypt.compare(password, this.password)
        return isValidated
    } catch (err) {
        return next()
    }

}

const User = mongoose.model("User", userSchema)

module.exports = User