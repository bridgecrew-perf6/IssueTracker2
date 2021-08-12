const express = require("express")
const router = express.Router({ mergeParams: true })
const { createProject, editProject, removeProject } = require("../handlers/projectHandler")

//create Project
router.post("/", createProject)

router.route("/:projectId")
    // Update Issue/s /api/users/:id/issues/:issueId/edit
    .patch(editProject)
//     //remove Issue /api/users/:id/issues/:issueId
    .delete(removeProject)
//     //get Issue /api/users/:id/issues/:issueId
//     .get(getIssue)

module.exports = router