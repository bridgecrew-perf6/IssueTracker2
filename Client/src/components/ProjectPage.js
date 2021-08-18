import React, { useMemo } from 'react'
import "../styles/projectPage.css"
import TestTable from '../components/TestTable'
import { projectPageIssueColumns, projectPageUsersColumns } from '../data/columns'

function ProjectPage(props) {
    const { project, users } = props
    const issueData = useMemo(() => project ? project.issues : [], [project])
    const userData = useMemo(() => users ? users : [], [users])
    const issueColumns = useMemo(() => projectPageIssueColumns, [])
    const usersColumns = useMemo(() => projectPageUsersColumns, [])
    if (project) {
        return (
            <div className="projectPage">
                <div className="projectPageHeader">
                    <h1 className="display-6">{project.projectName}</h1>
                    <button type="button" className="btn btn-primary btn-sm">edit</button>
                    <button type="button" className="btn btn-secondary btn-sm">remove</button>
                </div>
                <blockquote className="blockquote">
                    <p>{project.createdBy.username}</p>
                </blockquote>
                <div className="projectPageTables">
                    <div className="assignedDeveloperTable">
                        <h3>Assigned Developers</h3>
                        <TestTable
                            columns={usersColumns}
                            data={userData}
                            small
                        />
                    </div>
                    <div className="issuesTable">
                        <h3>Issues</h3>
                        <TestTable
                            columns={issueColumns}
                            data={issueData}
                            small
                        />
                    </div>
                    <br />
                </div>
            </div>
        )
    }
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default ProjectPage

