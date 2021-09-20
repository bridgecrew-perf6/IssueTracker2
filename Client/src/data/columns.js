import { Link } from 'react-router-dom'
import IssueMenu from '../components/IssueMenu'
// import { cellStyles, cellColors } from '../styles/customStyles'
import { formatDateTime } from '../utils/helperFunctions'
import '../styles/columnStyles.css'


export const projectColumns = [
  {
    Header: "Title",
    accessor: "projectName",
  },
  {
    Header: "Created By",
    accessor: "createdBy.username",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => new Date(value).toDateString()
  },
  {
    Header: "Target Date",
    accessor: "targetEndDate",
    Cell: ({ value }) => new Date(value).toDateString()
  },
]


export const projectPageIssueColumns = () => {
  const issueLink = (values) => <Link to={`/issues/${values._id}`} className="link">{values.title}</Link>
  return [
    {
      Header: "Title",
      accessor: "title",
      Cell: (cellInfo) => issueLink(cellInfo.row.original)
    },
    {
      Header: "Created By",
      accessor: "createdBy.username",
    },
    {
      Header: "Added",
      accessor: "createdAt",
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: "Updated",
      accessor: "updatedAt",
      Cell: ({ value }) => value ? formatDateTime(value) : "No Date Set"
    },
    {
      Header: "Actions",
      Cell: (cellInfo) => <IssueMenu issue={cellInfo.row.original} />
    },
  ]
}

export const projectPageUsersColumns = (admin) => [
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Role",
    Cell: ({ row }) => admin._id === row.original._id ? "Admin" : "Member"
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
]

export const issueColumns = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Project Name",
    accessor: "project.projectName",
  },
  {
    Header: "Created By",
    accessor: "createdBy.username",
  },
  {
    Header: "Priority",
    accessor: "priority",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => new Date(value).toDateString()
  },
]
