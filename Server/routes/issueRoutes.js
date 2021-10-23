const express = require("express")
const router = express.Router({ mergeParams: true })
const { createIssue, leaveIssue, deleteIssue, getIssue, updateIssue, updateIssueStatus, postComment, removeComment, patchComment } = require("../handlers/issueHandler")

// create Issue
router.post("/:projectId/create", createIssue)
router.patch("/:issueId/leave", leaveIssue)
router.post("/:issueId/comment", postComment)
router.route("/:issueId/comment/:commentId")
  .delete(removeComment)
  .patch(patchComment)
router.post("/:issueId/:type", updateIssueStatus)


router.route("/:issueId")
  //Update Issue/s /api/users/:id/issues/:issueId/edit
  .patch(updateIssue)
  //remove Issue /api/users/:id/issues/:issueId
  .delete(deleteIssue)
  //get Issue /api/users/:id/issues/:issueId
  .get(getIssue)

module.exports = router