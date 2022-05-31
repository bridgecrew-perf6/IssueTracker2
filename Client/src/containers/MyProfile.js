import React, { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import IssueListMobile from "../components/IssueListMobile"
import { projectPageIssueColumns } from "../data/columns"
import { useMediaQuery } from "react-responsive"
import "../styles/myProfile.css"
import TestTable from "../components/TestTable"

function MyProfile() {
  const issueColumns = useMemo(() => projectPageIssueColumns(), [])
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const { currentUser, issues } = useSelector((state) => state)
  const { username, email, id } = currentUser.user
  const [filterValue, setFilterValue] = useState("all")
  const filterIssues = (i) => {
    switch (filterValue) {
      case "open":
        return i.status === "open"
      case "closed":
        return i.status === "closed"
      default:
        return true
    }
  }
  const filterMyIssues = useMemo(
    () =>
      issues
        ? issues.filter(
            (issue) =>
              filterIssues(issue) &&
              (issue.createdBy._id === id ||
                issue.assignedUsers.map((user) => user._id).includes(id))
          )
        : [],
    [issues]
  )

  const filterRadioButtons = (
    <Form
      className="filterButtons"
      onChange={(e) => setFilterValue(e.target.id)}
    >
      <div key="inline-radio">
        <p>Filter Issues By</p>
        <Form.Check
          inline
          defaultChecked
          label="All"
          name="group1"
          type="radio"
          id="all"
        />
        <Form.Check
          inline
          label="Closed"
          name="group1"
          type="radio"
          id="closed"
        />
        <Form.Check inline label="Open" name="group1" type="radio" id="open" />
      </div>
    </Form>
  )

  const issueDataToDisplay = () => {
    if (filterMyIssues) {
      return isMobile ? (
        <IssueListMobile issues={filterMyIssues} />
      ) : filterMyIssues.length ? (
        <div className="issuesTable">
          <TestTable columns={issueColumns} data={filterMyIssues} small />
        </div>
      ) : (
        <p className="lead">No Issues Added Yet</p>
      )
    }
  }
  return (
    <div>
      <Card className="profilePageCard">
        <Card.Body>
          <div className="profilePageHeader">
            <h1 className="display-6">
              {username} : {email}
            </h1>
            {filterRadioButtons}
          </div>
        </Card.Body>
      </Card>
      <Card className="profilePageCard">
        <Card.Body>{issueDataToDisplay()}</Card.Body>
      </Card>
    </div>
  )
}

export default MyProfile
