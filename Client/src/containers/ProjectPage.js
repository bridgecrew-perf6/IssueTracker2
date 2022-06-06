import React, { useMemo, useState, useCallback } from "react"
import TestTable from "../components/TestTable"
import {
  projectPageIssueColumns,
  membersColumns,
  issueChangesColumns,
} from "../data/columns"
import Collapse from "react-bootstrap/Collapse"
import Card from "react-bootstrap/Card"
import DialogTemplate from "../components/DialogTemplate"
import useToggler from "../hooks/useToggle"
import IssueListMobile from "../components/IssueListMobile"
import HistoryListMobile from "../components/HistoryListMobile"
import { formatDateTime } from "../utils/helperFunctions"
import { useMediaQuery } from "react-responsive"
import IssuesForm from "../components/IssuesForm"
import ProjectForm from "../components/ProjectForm"
import { useHistory, useParams } from "react-router"
import { useDispatch } from "react-redux"
import { deleteProject, leaveProject } from "../store/actions/projectActions"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import "../styles/projectPage.css"

function ProjectPage(props) {
  const { project, issues, user } = props
  const { projectId } = useParams()
  const [show, toggle] = useToggler(false)
  const [filterValue, setFilterValue] = useState("all")
  const filterIssues = useCallback(
    (i) => {
      switch (filterValue) {
        case "open":
          return i.status === "open"
        case "closed":
          return i.status === "closed"
        default:
          return true
      }
    },
    [filterValue]
  )
  const history = useHistory()
  const issueData = useMemo(
    () =>
      issues
        ? issues.filter((i) => i.project === projectId && filterIssues(i))
        : [],
    [issues, projectId, filterIssues]
  )
  const userData = useMemo(
    () => (project ? [...project.assignedUsers, project.createdBy] : []),
    [project]
  )
  const issueColumns = useMemo(() => projectPageIssueColumns(), [])
  const usersColumns = useMemo(
    () => membersColumns(project?.createdBy),
    [project]
  )
  const changesColumns = useMemo(() => issueChangesColumns, [])
  const changesData = useMemo(() => (project ? project.history : []), [project])
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const dispatch = useDispatch()
  const handleDeleteProject = () =>
    dispatch(deleteProject(project._id, history))
  const handleLeaveProject = () => dispatch(leaveProject(project._id, history))

  const issueDataToDisplay = () => {
    if (issueData) {
      return isMobile ? (
        <IssueListMobile issues={issueData} />
      ) : issueData.length ? (
        <div className="issuesTable">
          <TestTable columns={issueColumns} data={issueData} small />
        </div>
      ) : (
        <p className="lead">No Issues Added Yet</p>
      )
    }
  }

  const filterRadioButtons = (
    <Form
      className="filterButtons"
      onChange={(e) => setFilterValue(e.target.id)}
    >
      <div key="inline-radio">
        <p>Filter Issues By</p>
        <Form.Check
          inline
          defaultChecked
          label="All"
          name="group1"
          type="radio"
          id="all"
        />
        <Form.Check
          inline
          label="Closed"
          name="group1"
          type="radio"
          id="closed"
        />
        <Form.Check inline label="Open" name="group1" type="radio" id="open" />
      </div>
    </Form>
  )

  const adminButtons = () =>
    project?.createdBy._id === user.id ? (
      <>
        <DialogTemplate
          title="Edit Project"
          dialogType="form"
          trigger={{
            type: isMobile ? "icon" : "normal",
            text: "Edit Project",
            icon: "bi-pencil-square",
          }}
        >
          <ProjectForm edit project={project} />
        </DialogTemplate>
        <DialogTemplate
          title="Delete Project"
          contentText="Are you sure you want to delete this project"
          actionBtnText="Remove Project"
          actionFunc={handleDeleteProject}
          trigger={{
            type: isMobile ? "icon" : "normal",
            text: "Delete Project",
            icon: "bi-trash",
          }}
        />
      </>
    ) : (
      <DialogTemplate
        title="Leave Project"
        contentText="Are you sure you want to leave this project"
        actionBtnText="Leave Project"
        actionFunc={handleLeaveProject}
        trigger={{
          type: isMobile ? "icon" : "normal",
          text: "Leave Project",
          icon: "bi-pencil-square",
        }}
      />
    )

  if (project) {
    return (
      <div className="pageWithTableContainer">
        <div className="projectPageTables">
          <Card className="projectIssuesCard" style={{ padding: "10px 16px"}}>
            <Card.Body>
              <div className="pageTitle" style={{ margin: "0px"}}>
                <h1 className="display-6">{project.projectName}</h1>
              </div>
              <p className="display">
                Project Description: {project.description}
              </p>
              <hr />
              <div className="subtitle">
                <p>
                  <strong>Admin: {project.createdBy.username}</strong>
                </p>
                <p>
                  <em>Created At: {formatDateTime(project.createdAt)}</em>
                </p>
              </div>
              <div className="pageButtons">
                {!isMobile ? (
                  <Button variant="primary" onClick={toggle}>
                    <i
                      style={{ marginRight: "10px" }}
                      className="bi bi-people"
                    ></i>
                    {show ? "HIDE MEMBERS" : "SHOW MEMBERS"}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={toggle}
                    style={{
                      height: "45px",
                      width: "45px",
                      borderRadius: "2em",
                    }}
                  >
                    <i className="bi bi-people"></i>
                  </Button>
                )}
                {adminButtons()}
              </div>
              <Collapse in={show}>
                <div className={"assignedDeveloperTable"}>
                  <h4 className="h4">Members</h4>
                  <TestTable columns={usersColumns} data={userData} small />
                </div>
              </Collapse>
            </Card.Body>
          </Card>
          <Card className="projectIssuesCard">
            <Card.Body className="cardBody">
              <div className="cardHeader">
                <h2 className="tableHeaders">Issues</h2>
                {filterRadioButtons}
                <DialogTemplate
                  title="Create Issue"
                  actionBtnText="Create Issue"
                  dialogType="form"
                  trigger={{
                    type: "menu",
                    text: "Create Issue",
                    icon: "bi-pencil-square",
                  }}
                >
                  <IssuesForm projectId={projectId} />
                </DialogTemplate>
              </div>
              {issueDataToDisplay()}
            </Card.Body>
          </Card>
          <Card className="projectIssuesCard">
            <Card.Body className="cardBody">
              <div className="cardHeader">
                <h2>History</h2>
              </div>
              {isMobile ? (
                <HistoryListMobile history={changesData} />
              ) : changesData.length ? (
                <div className="issuesTable">
                  <TestTable
                    columns={changesColumns}
                    data={changesData}
                    numColumns={10}
                    small
                  />
                </div>
              ) : (
                <p className="lead">No edits have been made</p>
              )}
            </Card.Body>
          </Card>
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
