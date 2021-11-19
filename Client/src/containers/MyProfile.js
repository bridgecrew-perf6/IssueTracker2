import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import IssueListMobile from '../components/IssueListMobile'
import '../styles/myProfile.css'

function MyProfile() {
  const { currentUser, issues } = useSelector(state => state)
  const { username, email, id } = currentUser.user
  const [filterValue, setFilterValue] = useState("all")
  const filterIssues = i => {
    switch(filterValue) {
      case "open": return i.status === "open"
      case "closed": return i.status === "closed"
      default: return true
    }
  }
  const filterMyIssues = issues.filter(issue => filterIssues(issue) && (issue.createdBy._id === id || issue.assignedUsers.map(user => user._id).includes(id)))
  const filterRadioButtons = (
    <Form onChange={(e) => setFilterValue(e.target.id)}>
      <div key="inline-radio" className="mb-3">
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
        <Form.Check
          inline
          label="Open"
          name="group1"
          type="radio"
          id="open"
        />
      </div>
    </Form>
  )
  return (
    <div>
      <Card className="profilePageCard">
        <Card.Body>
          <div className="projectPageHeader">
            <h1 className="display-6">{username} : {email}</h1>
            {filterRadioButtons}
          </div>
        </Card.Body>
      </Card >
      <Card className="profilePageCard">
        <Card.Body>
          {issues.length !== 0
            ? <IssueListMobile issues={filterMyIssues} />
            : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default MyProfile
