const express = require("express")
const router = express.Router({ mergeParams: true })
const { createProject, editProject, removeProject, leaveProject } = require("../handlers/projectHandler")
//create Project
router.post("/", createProject)

// /api/users/${id}/projects/${projectId}/leave
router.route("/:projectId/leave")
    .patch(leaveProject)

router.route("/:projectId")
    .patch(editProject)
    .delete(removeProject)

module.exports = router