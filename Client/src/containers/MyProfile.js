import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import IssueListMobile from '../components/IssueListMobile'
import '../styles/myProfile.css'

function MyProfile() {
  const { currentUser, issues } = useSelector(state => state)
  const { username, email, id } = currentUser.user
  const filterMyIssues = issues.filter(issue => issue.createdBy._id === id || issue.assignedUsers.map(user => user._id).includes(id))

  return (
    <div>
      <Card className="profilePageCard">
        <Card.Body>
          <div className="projectPageHeader">
            <h1 className="display-6">{username} : {email}</h1>
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
