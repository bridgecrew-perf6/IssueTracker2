import { Link } from "react-router-dom"
import IssueMenu from "../components/IssueMenu"
import {
  formatDateTime,
  formatDateTable,
  formatFormDate,
  formatTimeAgo,
} from "../utils/helperFunctions"
import "../styles/columnStyles.css"
import { ProjectMenu } from "../components/ProjectMenu"

const createdInfo = ({ createdAt, createdBy }) => (
  <div>
    <h3 className="infoHeader">{createdBy.username}</h3>
    <p className="infoDate">on {formatDateTable(createdAt)}</p>
  </div>
)
const infoActions = (values, type) => (
  <div className="infoActions">
    {values.targetEndDate ? (
      <h3 className="infoHeader">
        {new Date(values.targetEndDate).toDateString()}
      </h3>
    ) : (
      <h3 className="infoHeader">No Date Set</h3>
    )}
    {type === "project" ? <ProjectMenu project={values} /> : <IssueMenu issue={values}/>}
  </div>
)
const issuePriorityInfo = ({ priority }) => (
  <div className={`priorityInfo priority-${priority}`}>{priority}</div>
)
const projectLink = (values) => (
  <>
    <Link to={`/projects/${values._id}`} className="link infoHeader">
      {values.projectName}
    </Link>
    <p className="infoDate">updated {formatTimeAgo(values.createdAt)} ago</p>
  </>
)
const issuesLink = (values) => (
  <>
    <Link to={`/issues/${values._id}`} className="link infoHeader">
      {values.title}
    </Link>
    <p className="infoDate">updated {formatTimeAgo(values.createdAt)} ago</p>
  </>
)

export const projectColumns = () => {
  return [
    {
      Header: "Project Details",
      Cell: (cellInfo) => projectLink(cellInfo.row.original),
    },
    {
      Header: "Created By",
      Cell: (cellInfo) => createdInfo(cellInfo.row.original),
    },
    {
      Header: "Members",
      Cell: (cellInfo) => (
        <h3 className="infoHeader">
          {cellInfo.row.original.assignedUsers.length + 1}
        </h3>
      ),
    },
    {
      Header: "Target Date",
      Cell: (cellInfo) => infoActions(cellInfo.row.original, "project"),
    },
  ]
}

export const projectPageIssueColumns = () => {
  return [
    {
      Cell: (cellInfo) => issuesLink(cellInfo.row.original),
      Header: "Issue Details",
    },
    {
      Header: "Created By",
      Cell: (cellInfo) => createdInfo(cellInfo.row.original),
    },
    {
      Header: "Priority",
      Cell: (cellInfo) => issuePriorityInfo(cellInfo.row.original),
    },
    {
      Header: "Target Date",
      Cell: (cellInfo) => infoActions(cellInfo.row.original, "issue"),
    },
  ]
}

export const membersColumns = (admin) => [
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Role",
    Cell: ({ row }) => (admin._id === row.original._id ? "Admin" : "Member"),
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
]

export const issueChangesColumns = [
  {
    Header: "Property",
    accessor: "property",
  },
  {
    Header: "Old Value",
    accessor: "oldValue",
    Cell: ({ value, row }) => {
      switch (row.values.property) {
        case "targetEndDate":
          return formatFormDate(value)
        case "assignedUsers":
          return value.length
            ? value.map((val) => val.username + ", ")
            : "No Users"
        default:
          return value
      }
    },
  },
  {
    Header: "New Value",
    accessor: "newValue",
    Cell: ({ value, row }) => {
      switch (row.values.property) {
        case "targetEndDate":
          return formatFormDate(value)
        case "assignedUsers":
          return value.length
            ? value.map((val) => val.username + ", ")
            : "No Users"
        default:
          return value
      }
    },
  },
  {
    Header: "Updated By",
    accessor: "updatedBy",
    Cell: ({ value, row }) =>
      value?.username
        ? `${value.username} ~${formatDateTime(row.original.updatedAt)}`
        : "Undefined User",
  },
]
