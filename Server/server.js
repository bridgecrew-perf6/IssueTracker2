require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const { User, Issue, Project, IssueHistory } = require("./models")
const authRoutes = require("./routes/authRoutes")
const issueRoutes = require("./routes/issueRoutes")
const projectRoutes = require("./routes/projectRoutes")
const errorHandler = require("./handlers/errorHandler")
const { ensureCorrectUser, loginRequired } = require("./middleware/auth")
const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", authRoutes)
app.use("/api/users/:id/issues", issueRoutes)
app.use("/api/users/:id/projects", loginRequired, projectRoutes)

app.get("/api/issues", async function (req, res, next) {
  const allIssues = await Issue.find({})
    .sort({ createdAt: "asc" })
    .populate("assignedUsers", { username: true, email: true })
    .populate("createdBy", { username: true, email: true })
    .populate({ path: "history", populate: { path: "updatedBy", select: "username" } })
    .populate({ path: "comments", populate: { path: "createdBy", select: "username" } })
  return res.status(200).json(allIssues)
})

app.get("/api/issues/history", async function (req, res, next) {
  const allHistory = await IssueHistory.find({})
    .sort({ createdAt: "asc" })
  return res.status(200).json(allHistory)
})

app.post("/api/testing", async function (req, res, next) {
  return res.status(200).json({
    message: "this is my message"
  })
})

app.get("/:id/api/projects", async function (req, res, next) {
  const { id } = req.params
  const allProjects = await Project.find({ $or: [{ createdBy: id }, { assignedUsers: id }] })
    .sort({ createdAt: "asc" })
    .populate("assignedUsers", { username: true, email: true })
    .populate("createdBy", { username: true, email: true })
    .populate({ path: "issues", populate: { path: "createdBy", select: "username" } })
    .populate({ path: "history", populate: { path: "updatedBy", select: "username" } })
  return res.status(200).json(allProjects)
})

app.get("/api/users", async function (req, res, next) {
  const allUsers = await User.find({})
    .sort({ createdAt: "asc" })
  return res.status(200).json(allUsers)
})

app.use(function (req, res, next) {
  let err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})