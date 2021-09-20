import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteIssue, updateIssueStatus } from '../store/actions/issueActions'
import DialogTemplate from './DialogTemplate'
import IssuesForm from './IssuesForm'
import CommentsForm from './CommentsForm'

function IssueMenu({
  issue,
}) {
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <i
      className="bi bi-three-dots"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
    </i>
  ))

  const dispatch = useDispatch()
  const handleDeleteIssue = () => dispatch(deleteIssue(issue._id))
  const handleIssueStatus = () => {
    const type = issue.status === "open" ? "closed" : "open"
    dispatch(updateIssueStatus(issue._id, type))
  }

  return (
    <div >
      <Dropdown >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic-button" title="Dropdown button" />
        <Dropdown.Menu >
          <Dropdown.Item as={Link} to={`/issues/${issue._id}`} href="#/action-2">
            <i style={{ marginRight: '10px' }} className="bi bi-link-45deg"></i>
            View Bug
          </Dropdown.Item>
          <DialogTemplate
            title="Remove"
            contentText="Are you sure you want to remove issue"
            actionBtnText="Remove"
            actionFunc={handleDeleteIssue}
            trigger={{
              type: "menu",
              text: "Remove Bug",
              icon: "bi-trash",
              iconStyle: { marginRight: '10px' },
            }}
          />
          {issue.status === "open" ? (
            <DialogTemplate
              title="Close"
              contentText="Are you sure you want to close issue"
              actionBtnText="Close Issue"
              actionFunc={handleIssueStatus}
              trigger={{
                type: "menu",
                text: "Close Issue",
                icon: "bi-check2",
                iconStyle: { marginRight: '10px' },
              }}
            />
          ) : (
            <DialogTemplate
              title="Re-open"
              contentText="Are you sure you want to re-open issue"
              actionBtnText="Re-open Issue"
              actionFunc={handleIssueStatus}
              trigger={{
                type: "menu",
                text: "Re-open Issue",
                icon: "bi-arrow-return-right",
                iconStyle: { marginRight: '10px' },
              }}
            />
          )}
          <DialogTemplate
            title="Edit Issue"
            actionBtnText="Edit Issue"
            dialogType="form"
            trigger={{
              type: "menu",
              text: "Edit Issue",
              icon: "bi-pencil-square",
              iconStyle: { marginRight: '10px' },
            }}
          >
            <IssuesForm
              issue={issue}
              edit
            />
          </DialogTemplate>
          <DialogTemplate
            title="Add Comment"
            dialogType="form"
            trigger={{
              type: "menu",
              text: "Add Comment",
              icon: "bi-card-text",
              iconStyle: { marginRight: '10px' },
            }}
          >
            <CommentsForm
              id={issue._id}
            />
          </DialogTemplate>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default IssueMenu