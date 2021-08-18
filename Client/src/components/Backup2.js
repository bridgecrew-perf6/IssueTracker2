import React, { useMemo } from 'react'
import "../styles/projectPage.css"
import { useTable, usePagination } from 'react-table'
import IssueItem from './IssueItem'
import Table from 'react-bootstrap/Table'

function ProjectPage(props) {
    const { project } = props
    const data = useMemo(() => project ? project.issues : [], [project])
    const columns = useMemo(() => [
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
        {
            Header: "functions",
            Cell: () => (
                <>
                <button>Click</button>
                <button>Click</button>
                <button>Click</button>
                </>
            )
        }
    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data }, usePagination)


    if (project) {
        return (
            <div>
                <div className="projectPageHeader">
                    <h1 className="display-6">{project.projectName}</h1>
                    <button type="button" className="btn btn-primary btn-sm">edit</button>
                    <button type="button" className="btn btn-secondary btn-sm">remove</button>
                </div>
                <blockquote className="blockquote">
                    <p>{project.createdBy.username}</p>
                </blockquote>
                <div className="issuesTable">
                    <h3>Table</h3>
                    <Table hover size="sm" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div className="pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                            | Go to page:{' '}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[1, 2, 3, 4, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
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

