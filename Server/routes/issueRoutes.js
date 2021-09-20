const express = require("express")
const router = express.Router({ mergeParams: true })
const { createIssue, deleteIssue, getIssue, updateIssue, updateIssueStatus, postComment } = require("../handlers/issueHandler")

//create Issue
router.post("/:projectId/create", createIssue)
router.post("/:issueId/comment", postComment)
router.post("/:issueId/:type", updateIssueStatus)

router.route("/:issueId")
  //Update Issue/s /api/users/:id/issues/:issueId/edit
  .patch(updateIssue)
  //remove Issue /api/users/:id/issues/:issueId
  .delete(deleteIssue)
  //get Issue /api/users/:id/issues/:issueId
  .get(getIssue)

module.exports = router