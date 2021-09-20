import React, { Fragment } from 'react';
import '../styles/IssueListMobile.css'
import { formatDateTime } from '../utils/helperFunctions'
import IssueMenu from './IssueMenu'
import { cellStyles, cellColors } from '../styles/customStyles'

function IssueListMobile({ issueData = [] }) {
    const mappedIssues = issueData.map((issue, i) => (
        <Fragment key={i}>
            <ul className="list-unstyled">
                <li>
                    <span className="h5">
                        {issue.title}&nbsp;
                    </span>
                    <i className="bi bi-link-45deg"></i>
                </li>
                <li>
                    <span className="spanStyles">
                        Priority:
                    </span>
                    <div style={{
                        ...cellStyles,
                        backgroundColor: cellColors[issue.priority],
                        color: issue.priority === 'low' ? '#000' : '#fff',
                    }}>{issue.priority}</div>
                </li>
                <li>
                    <span className="spanStyles">
                        Status:
                    </span>
                    <div style={{
                        ...cellStyles,
                        backgroundColor: cellColors[issue.status],
                        color: issue.status === 'closed' ? '#008000' : '#000080',
                    }}>{issue.status}</div>
                </li>

                <li>
                    <span className="spanStyles">
                        Type:
                    </span>
                    <div style={{
                        ...cellStyles,
                        backgroundColor: cellColors[issue.type],
                    }}>{issue.type}</div>
                </li>
                <li>
                    <span className="spanStyles">
                        Created:
                    </span>
                    <div style={{
                        ...cellStyles,

                    }}>{formatDateTime(issue.createdAt)}</div>
                </li>
                <li>
                    <span className="spanStyles">
                        Updated:
                    </span>
                    <div style={{
                        ...cellStyles,

                    }}>{formatDateTime(issue.updatedAt)}</div>
                </li>
                <li className="itemButtons">
                    <div>
                        <i className="bi bi-chat-square-text"></i>
                        &nbsp;: {issue?.comments.length}
                    </div>
                    <IssueMenu issue={issue} />
                </li>
            </ul>
            <hr />
        </Fragment>
    ))
    return (
        <div className="issueListContainer">
            {mappedIssues}
        </div>
    )
}

export default IssueListMobile