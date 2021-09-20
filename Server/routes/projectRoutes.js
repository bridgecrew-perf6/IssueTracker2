const express = require("express")
const router = express.Router({ mergeParams: true })
const { createProject, editProject, removeProject } = require("../handlers/projectHandler")
//create Project
router.post("/", createProject)

router.route("/:projectId")
    .patch(editProject)
    .delete(removeProject)

module.exports = router