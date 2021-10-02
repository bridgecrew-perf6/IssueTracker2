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
      <Card>
        <Card.Body>
          <div className="projectPageHeader">
            <h1 className="display-6">{username} : {email}</h1>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <IssueListMobile issues={filterMyIssues} />
        </Card.Body>
      </Card>
    </div>
  )
}

export default MyProfile