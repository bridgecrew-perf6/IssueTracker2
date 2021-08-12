import React from 'react'
import '../styles/myProfile.css'
import IssueItem from './IssueItem'
import ProjectItem from './ProjectItem'
import Table from 'react-bootstrap/table'

function MyProfile({ projects, issues, currentUser }) {
    const myProjects = projects.map((project, i) => (
        <ProjectItem
            project={project}
            key={i}
            index={i + 1}
            small
        />
    ))
    const myIssues = issues.map((issue, i) => (
        <IssueItem
            issue={issue}
            key={i}
            index={i + 1}
            small
        />
    ))
    return (
        <div>
            <h1>Welcome {currentUser.user.username}</h1>
            <div className="profileContainer">
                <div className="projectsTable">
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">title</th>
                                <th scope="col">target date</th>
                            </tr>
                        </thead>
                        <tbody >
                            {myProjects}
                        </tbody>
                    </Table>
                </div>
                <div className="issuesTable">
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">title</th>
                                <th scope="col">target date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myIssues}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default MyProfile