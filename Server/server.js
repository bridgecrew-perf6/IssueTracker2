require("dotenv").config()
const express = require("express")
const app = express()
const {User} = require("./models")
const authRoutes = require("./routes/auth")
const session = require("express-session")
const errorHandler = require("./middleware/error")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const sessionOptions = { secret: "badSecret", resave: false, saveUninitialized: false }
app.use(session(sessionOptions))
app.use("/api/auth", authRoutes)

app.use(function(req, res, next) {
    let err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use(errorHandler)


app.listen("3080", () => {
    console.log("listening on port 3080")
})