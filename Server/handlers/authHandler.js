const { User, Issue } = require("../models")
const jwt = require("jsonwebtoken")

exports.signup = async function (req, res, next) {
    try {
        const user = await User.create(req.body)
        const { id, username } = user
        const correctPassword = await user.validatePassword(req.body.password)
        if (correctPassword) {
            const token = jwt.sign({
                id,
                username,
            },
            process.env.SECRET_KEY
            )
            return res.status(200).json({
                id,
                username,
                token
            })
        } else {
            return next({ status: 400, message: "please enter your information correctly" })
        }

    } catch (err) {
        return next(err)
    }
}

exports.login = async function (req, res, next) {
    try {
        //find the user
        const user = await User.findOne({ username: req.body.username })
        const { id, username } = user
        //authenticate user and log them in
        const correctPassword = await user.validatePassword(req.body.password)
        if(correctPassword) {
            const token = jwt.sign({
                id,
                username,
            },
            process.env.SECRET_KEY
            )
            console.log(" all g")
            return res.status(200).json({
                id,
                username,
                token,
            })
        } else {
            return next({ status: 400, message: "Incorrect username or password" })
        }
    } catch(err) {
        return next({ status: 400, message: "Incorrect username or password" })
    }

}

exports.deleteUser = async function (req, res, next) {
    try {
        const foundUser = await User.findById(req.params.id)
        const issuesToDelete = foundUser.issues
        await Issue.remove({_id: {$in: issuesToDelete}})
        await foundUser.remove()
        return res.status(200).json({
            message: "user removed"
        })
    } catch (err) {
        next(err)
    }
}
