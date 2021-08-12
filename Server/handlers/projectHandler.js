const { User, Issue, Project } = require("../models")
//handle errors
const handleErrors = (err) => {
    let elements = []
    if (err.message.includes("Project validation failed")) {
        Object.values(err.errors).forEach(({message}) => {
            elements.push(message)
        })
    }
    return elements
} 

exports.createProject = async function (req, res, next) {
    try {
        const { id } = req.params
        const post = await Project.create({ ...req.body, createdBy: id })
        const user = await User.findOne({ _id: id })
        user.projects.push(post)
        await user.save()
        const project = await Project.findOne(req.body).populate("createdBy", { username: true, projects: true })
        return res.status(200).json(project)
    } catch (err) {
        const errorMessageArray = handleErrors(err)
        return next({ status: 400, message: errorMessageArray.join(" & ")})
    }
}

exports.editProject = async function (req, res, next) {
    try {
        //Update Issue/s /api/users/:id/issues/:projectId/edit
        const { projectId } = req.params
        const foundProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true })
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
        await Issue.remove({_id : { $in: issuesToDelete}})
        await foundProject.remove()
        return res.status(200).json({
            project: foundProject
        })
    } catch (err) {
        return next(err)
    }
}