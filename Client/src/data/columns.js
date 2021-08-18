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

export const projectPageIssueColumns = [
    {
        Header: "Title",
        accessor: "title",
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

export const projectPageUsersColumns = [
    {
        Header: "Username",
        accessor: "username",
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
