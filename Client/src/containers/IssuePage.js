import React, { useMemo } from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import DialogTemplate from "../components/DialogTemplate"
import { formatDateTime, formatTimeAgo } from "../utils/helperFunctions"
import {
  deleteIssue,
  updateIssueStatus,
  deleteComment,
  leaveIssue,
} from "../store/actions/issueActions"
import CommentsForm from "../components/CommentsForm"
import IssuesForm from "../components/IssuesForm"
import HistoryListMobile from "../components/HistoryListMobile"
import { cellStyles, cellColors, spanStyles } from "../styles/customStyles"
import TestTable from "../components/TestTable"
import { membersColumns, issueChangesColumns } from "../data/columns"
import Collapse from "react-bootstrap/Collapse"
import useToggler from "../hooks/useToggle"
import { useMediaQuery } from "react-responsive"
import "../styles/issuePage.css"

function IssuePage({ issue, user }) {
  const dispatch = useDispatch()
  const [show, toggle] = useToggler(false)
  const usersColumns = useMemo(() => membersColumns(issue?.createdBy), [issue])
  const userData = useMemo(
    () => (issue ? [...issue.assignedUsers, issue.createdBy] : []),
    [issue]
  )
  const changesColumns = useMemo(() => issueChangesColumns, [])
  const changesData = useMemo(() => (issue ? issue.history : []), [issue])
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isAdmin = user.id === issue?.createdBy._id
  const isMember =
    issue?.assignedUsers.map((user) => user._id).includes(user.id) || isAdmin
  const handleDeleteIssue = () => dispatch(deleteIssue(issue._id))
  const handleLeaveIssue = () => dispatch(leaveIssue(issue._id))
  const handleDeleteComment = (commentId) =>
    dispatch(deleteComment(commentId, issue._id))
  const handleIssueStatus = () => {
    const type = issue.status === "open" ? "closed" : "open"
    dispatch(updateIssueStatus(issue._id, type))
  }

  const mappedComments = issue?.comments.map((comment, i) => (
    <div key={comment._id} className="mappedIssuesContainer">
      <ul className="list-unstyled">
        <li className="title">
          <span style={spanStyles}>
            {comment.createdBy.username} :
            <em> Created {formatTimeAgo(comment.createdAt)} ago</em>
            {comment.createdAt !== comment.updatedAt && (
              <em> ~ updated {formatTimeAgo(comment.updatedAt)} ago</em>
            )}
          </span>
        </li>
        <li>
          <span style={{ spanStyles }}>{comment.text}</span>
        </li>
        <li className="issueButtons">
          <DialogTemplate
            title="Edit Comment"
            dialogType="form"
            trigger={{
              type: "normal",
              variant: "secondary",
              size: "sm",
              text: "Edit",
              icon: "bi-pencil-square",
            }}
          >
            <CommentsForm issueId={issue._id} comment={comment} edit />
          </DialogTemplate>
          <DialogTemplate
            title="Remove"
            contentText="Are you sure you want to remove issue"
            actionBtnText="Remove"
            actionFunc={() => handleDeleteComment(comment._id)}
            trigger={{
              type: "normal",
              variant: "secondary",
              size: "sm",
              text: "Remove",
              icon: "bi-trash",
            }}
          />
        </li>
      </ul>
      {issue.comments.length !== i + 1 && <hr className="comments-divider" />}
    </div>
  ))

  const issueDetails = () => (
    // Title, description, status, type
    <>
      <div className="pageTitle" style={{ margin: "0px" }}>
        <h1 className="display-6">Issue: {issue.title}</h1>
      </div>
      <hr />
      <ul className="list-unstyled">
        <li>
          <span style={{ ...spanStyles }}>
            <strong>Created By: {issue.createdBy.username}</strong>
          </span>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Description:</span>
          <div
            style={{
              ...cellStyles,
            }}
          >
            {issue?.description}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Your Role:</span>
          <div
            style={{
              ...cellStyles,
            }}
          >
            {isMember ? (isAdmin ? "Admin" : "Member") : "None"}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Priority:</span>
          <div
            style={{
              ...cellStyles,
              backgroundColor: cellColors[issue.priority],
              color: issue.priority === "low" ? "#000" : "#fff",
            }}
          >
            {issue.priority}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Status:</span>
          <div
            style={{
              ...cellStyles,
              backgroundColor: cellColors[issue.status],
              color: issue.status === "closed" ? "#008000" : "#000080",
            }}
          >
            {issue.status}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Type:</span>
          <div
            style={{
              ...cellStyles,
              backgroundColor: cellColors[issue.type],
            }}
          >
            {issue.type}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Created:</span>
          <div
            style={{
              ...cellStyles,
            }}
          >
            {formatDateTime(issue.createdAt)}
          </div>
        </li>
        <li>
          <span style={{ ...spanStyles }}>Updated:</span>
          <div
            style={{
              ...cellStyles,
            }}
          >
            {formatDateTime(issue.updatedAt)}
          </div>
        </li>
      </ul>
    </>
  )

  const issueButtons = () =>
    //close issue, update, and delete
    issue?.createdBy._id === user.id ? (
      <>
        {issue.status === "open" ? (
          <DialogTemplate
            title="Close"
            contentText="Are you sure you want to close issue"
            actionBtnText="Close Issue"
            actionFunc={handleIssueStatus}
            trigger={{
              type: isMobile ? "icon" : "normal",
              text: "Close Issue",
              icon: "bi-check2",
            }}
          />
        ) : (
          <DialogTemplate
            title="Re-open"
            contentText="Are you sure you want to re-open issue"
            actionBtnText="Re-open Issue"
            actionFunc={handleIssueStatus}
            trigger={{
              type: isMobile ? "icon" : "normal",
              text: "Re-open Issue",
              icon: "bi-arrow-return-right",
            }}
          />
        )}
        <DialogTemplate
          title="Edit Issue"
          actionBtnText="Edit Issue"
          dialogType="form"
          trigger={{
            type: isMobile ? "icon" : "normal",
            text: "Edit Issue",
            icon: "bi-pencil-square",
          }}
        >
          <IssuesForm issue={issue} edit />
        </DialogTemplate>
        <DialogTemplate
          title="Remove"
          contentText="Are you sure you want to remove issue"
          actionBtnText="Remove"
          actionFunc={handleDeleteIssue}
          trigger={{
            type: isMobile ? "icon" : "normal",
            text: "Remove Issue",
            icon: "bi-trash",
          }}
        />
      </>
    ) : (
      isMember && (
        <DialogTemplate
          title="Leave Issue"
          contentText="Are you sure you want to leave this Issue"
          actionBtnText="Leave Issue"
          actionFunc={handleLeaveIssue}
          trigger={{
            type: isMobile ? "icon" : "normal",
            text: "Leave Issue",
            icon: "bi-pencil-square",
          }}
        />
      )
    )

  const adminButtons = () =>
    !isMobile ? (
      <Button variant="primary" onClick={toggle}>
        <i style={{ marginRight: "10px" }} className="bi bi-people"></i>
        {show ? "HIDE MEMBERS" : "SHOW MEMBERS"}
      </Button>
    ) : (
      <Button
        variant="secondary"
        onClick={toggle}
        style={{
          height: "45px",
          width: "45px",
          borderRadius: "2em",
        }}
      >
        <i className="bi bi-people"></i>
      </Button>
    )

  if (issue) {
    return (
      <div className="pageWithTableContainer">
        <Card className="projectIssuesCard px-md-3 py-md-3 py-1">
          <Card.Body>
            {issueDetails()}
            <div className="issueButtons">
              {adminButtons()}
              {issueButtons()}
            </div>
            <Collapse in={show}>
              <div className={"assignedDeveloperTable"}>
                <h4 className="h4">Members</h4>
                <TestTable columns={usersColumns} data={userData} small />
              </div>
            </Collapse>
          </Card.Body>
        </Card>
        <Card className="projectIssuesCard">
          <Card.Body className="cardBody">
            <div className="cardHeader">
              <h2>Comments</h2>
              <DialogTemplate
                title="Add Comment"
                dialogType="form"
                trigger={{
                  type: "menu",
                  text: "Add Comment",
                  icon: "bi-card-text",
                }}
              >
                <CommentsForm issueId={issue._id} />
              </DialogTemplate>
            </div>
            {issue?.comments.length !== 0 ? (
              mappedComments
            ) : (
              <p className="lead">No comments have been made</p>
            )}
          </Card.Body>
        </Card>
        <Card className="projectIssuesCard">
          <Card.Body className="cardBody">
            <div className="cardHeader">
              <h2>History</h2>
            </div>
            {isMobile ? (
              <HistoryListMobile history={changesData} />
            ) : changesData.length ? (
              <TestTable
                columns={changesColumns}
                data={changesData}
                numColumns={10}
                small
              />
            ) : (
              <p className="lead">No edits have been made</p>
            )}
          </Card.Body>
        </Card>
      </div>
    )
  }
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default IssuePage
