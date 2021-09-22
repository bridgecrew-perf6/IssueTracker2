const { User, Issue, Project } = require("../models")
//handle errors, then create a more human readable error message
const handleErrors = (err) => {
  let elements = []
  if (err.message.includes("Issue validation failed")) {
    Object.values(err.errors).forEach(({ message }) => {
      elements.push(message)
    })
  }
  return elements
}

exports.createIssue = async function (req, res, next) {
  try {
    const { id, projectId } = req.params
    const post = await Issue.create({ ...req.body, createdBy: id, project: projectId})
    const foundUser = await User.findById(id)
    foundUser.issues.push(post)
    await foundUser.save()
    const foundProject = await Project.findById(projectId)
    foundProject.issues.push(post)
    await foundProject.save()
    const issue = await Issue.findOne(req.body)
      .populate("createdBy", { username: true })
    return res.status(200).json(issue)
  } catch (err) {
    const errorMessageArray = handleErrors(err)
    return next({ status: 400, message: errorMessageArray.join(" & ") })
  }
}

//remove Issue /api/users/:id/issues/:issueId
exports.deleteIssue = async function (req, res, next) {
  try {
    const foundIssue = await Issue.findById(req.params.issueId)
    console.log("delete1")
    const result = await foundIssue.remove()
    console.log("delete2")
    return res.status(200).json({
      issue: foundIssue
    })
  } catch (err) {
    next(err)
  }
}

//get Issue /api/users/:id/issues/:issueId
exports.getIssue = async function (req, res, next) {
  try {
    const issue = await Issue.findById(req.params.issueId)
    return res.status(200).json({
      issue,
    })
  } catch (err) {
    return next(err)
  }
}

exports.updateIssueStatus = async function (req, res, next) {
  try {
    const status = req.params.type
    const issue = await Issue.findByIdAndUpdate(req.params.issueId, { status }, { new: true})
    return res.status(200).json({
      issue,
    })
  } catch {
    return next(err)
  }
}

//Update Issue/s /api/users/:id/issues/:issueId/edit
exports.updateIssue = async function (req, res, next) {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.issueId, req.body, { new: true , runValidators: true})
      .populate("createdBy", { username: true })
    return res.status(200).json({
      issue
    })
  } catch (err) {
    return next(err)
  }
}

//Add a comment to the comments array
exports.postComment = async function (req, res, next) {
  try {
    const { comment } = req.body
    const issue = await Issue.findById(req.params.issueId)
    // await issue.updateOne({ comments: [...issue.comments, comment]}, { new: true})
    issue.comments = [...issue.comments, comment]
    issue.save()
    return res.status(200).json({
      issue
    })
  } catch (err) {
    return next(err)
  }
}
