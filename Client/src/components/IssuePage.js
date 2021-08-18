import React from 'react'
import "../styles/projectPage.css"
// import IssueItem from './IssueItem'

function IssuePage(props) {
    const { issue } = props
    console.log(issue)
    if (issue) {
        return (
            <div>
                <div className="projectPageHeader">
                    <h1 className="display-6">{issue.title}</h1>
                    <button type="button" className="btn btn-primary btn-sm">edit</button>
                    <button type="button" className="btn btn-secondary btn-sm">remove</button>
                </div>
                <blockquote className="blockquote">
                    <p>Created By: {issue.createdBy.username}</p>
                </blockquote>
                <div className="issuesTable">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">title</th>
                                <th scope="col">target date</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
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

export default IssuePage