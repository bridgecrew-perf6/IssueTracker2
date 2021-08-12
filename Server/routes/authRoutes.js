const express = require("express")
const router = express.Router()
const { login, signup, deleteUser } = require("../handlers/authHandler")

// default route api/auth
router.post("/signup", signup)
router.post("/login", login)
router.delete("/:id", deleteUser)

module.exports = router
