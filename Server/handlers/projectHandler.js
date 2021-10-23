const { User, Issue, Project, ProjectHistory } = require("../models")
//handle errors
const handleErrors = (err) => {
  let elements = []
  if (err.message.includes("Project validation failed")) {
    Object.values(err.errors).forEach(({ message }) => {
      elements.push(message)
    })
  }
  return elements
}

exports.createProject = async function (req, res, next) {
  try {
    const { id } = req.params
    const post = await Project.create({ ...req.body, createdBy: id })
    const foundUser = await User.findById(id)
    foundUser.projects.push(post)
    await foundUser.save()
    const project = await Project.findOne(req.body)
    .populate("assignedUsers", { username: true, email: true })
    .populate("createdBy", { username: true, email: true })
    return res.status(200).json(project)
  } catch (err) {
    const errorMessageArray = handleErrors(err)
    return next({ status: 400, message: errorMessageArray.join(" & ") })
  }
}

exports.editProject = async function (req, res, next) {
  try {
    //Update Issue/s /api/users/:id/issues/:projectId/edit
    const { projectId, id } = req.params
    const { projectData, projectDifferences } = req.body
    const foundProject = await Project.findByIdAndUpdate(projectId, projectData, { new: true })
      .populate("assignedUsers", { username: true, email: true })
      .populate("createdBy", { username: true, email: true })
    for (let value of projectDifferences) {
      let projectHistory = await ProjectHistory.create({ ...value, updatedBy: id })
      foundProject.history.push(projectHistory)
    }
    await foundProject.save().then(p => p.populate({ path: "history", populate: { path: "updatedBy", select: "username" } }).execPopulate())
    return res.status(200).json({
      project: foundProject
    })
  } catch (err) {
    return next(err)
  }
}

exports.removeProject = async function (req, res, next) {
  try {
    const { projectId } = req.params
    const foundProject = await Project.findById(projectId)
    const foundUser = await User.findById(foundProject.createdBy)
    await foundUser.projects.remove(foundProject._id)
    const issuesToDelete = foundProject.issues
    await Issue.remove({ _id: { $in: issuesToDelete } })
    await foundProject.remove()
    return res.status(200).json({
      project: foundProject
    })
  } catch (err) {
    return next(err)
  }
}

exports.leaveProject = async function (req, res, next) {
  try {
    const foundUser = await User.findById(req.params.id)
    const foundProject = await Project.findById(req.params.projectId)
      .populate("assignedUsers", { username: true, email: true })
      .populate("createdBy", { username: true, email: true })
    foundProject.assignedUsers.remove(foundUser)
    await foundProject.save()
    return res.status(200).json({
      project: foundProject
    })
  } catch (err) {
    return next(err)
  }
}

