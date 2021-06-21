const { User } = require("../models")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/signup", async function (req, res, next) {
    try {
        const user = await User.create(req.body)
        const { id, username } = user
        const correctPassword = user.validatePassword(req.body.password)
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
            return next({ status: 400, message: "youre on drugs" })
        }

    } catch (err) {
        return next(err)
    }
})
router.post("/login", async function (req, res, next) {
    try {
        //find the user
        const user = await User.findOne({ username: req.body.username })
        const { id, username } = user
        //authenticate user and log them in
        const correctPassword = user.validatePassword(req.body.password)
        if(correctPassword) {
            const token = jwt.sign({
                id,
                username,
            },
            process.env.SECRET_KEY
            )
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

})

module.exports = router
