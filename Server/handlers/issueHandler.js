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
        const { id } = req.params
        const post = await Issue.create({ ...req.body, createdBy: id })
        const foundUser = await User.findById(id)
        foundUser.issues.push(post)
        await foundUser.save()
        const foundProject = await Project.findById(req.body.project)
        foundProject.issues.push(post)
        foundProject.save()
        const issue = await Issue.findOne(req.body)
            .populate("createdBy", { username: true })
            .populate("project")
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
        const result = await foundIssue.remove()
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
        // const issue = await Issue.findById(req.params.issueId)
        const token = req.headers.authorization.split(" ")[1]
        return res.status(200).json({
            // issue,
            token
        })
    } catch (err) {
        return next(err)
    }

}

//Update Issue/s /api/users/:id/issues/:issueId/edit
exports.updateIssue = async function (req, res, next) {
    try {
        console.log(req.body)
        const issue = await Issue.findByIdAndUpdate(req.params.issueId, req.body, { new: true })
            .populate("project", { projectName: true })
            .populate("createdBy", { username: true })
        return res.status(200).json({
            issue
        })
    } catch (err) {
        return next(err)
    }
}