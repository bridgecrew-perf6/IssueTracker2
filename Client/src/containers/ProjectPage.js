import React, { useMemo } from 'react'
import TestTable from '../components/TestTable'
import { projectPageIssueColumns, projectPageUsersColumns } from '../data/columns'
import Card from 'react-bootstrap/Card'
import useToggler from '../hooks/useToggle'
import Collapse from 'react-bootstrap/Collapse'
import IssueListMobile from '../components/IssueListMobile'
import { formatDateTime } from '../utils/helperFunctions'
import { useMediaQuery } from 'react-responsive'
import DialogTemplate from '../components/DialogTemplate'
import IssuesForm from '../components/IssuesForm'
import ProjectForm from '../components/ProjectForm'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteProject } from '../store/actions/projectActions'
import "../styles/projectPage.css"


function ProjectPage(props) {
  const { project, issues, user } = props
  const { projectId } = useParams()
  const history = useHistory()
  const issueData = useMemo(() => issues ? issues.filter(i => i.project === projectId) : [], [issues, projectId])
  const userData = useMemo(() => project ? [...project.assignedUsers, project.createdBy] : [], [project])
  const issueColumns = useMemo(() => projectPageIssueColumns(), [])
  const usersColumns = useMemo(() => projectPageUsersColumns(project?.createdBy), [project])
  const [show, toggle] = useToggler(false)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const dispatch = useDispatch()
  const handleDeleteProject = () => dispatch(deleteProject(project._id, history))
  // const handleLeaveProject = () => dispatch(leaveProject(project._id, history))

  const adminButtons = () => {
    return project?.createdBy._id === user.id
      ? (
        <>
          <DialogTemplate
            title="Edit Project"
            dialogType="form"
            trigger={{
              type: "normal",
              text: "Edit Project",
              icon: "bi-pencil-square",
              iconStyle: { marginRight: '10px' },
            }}
          >
            <ProjectForm
              edit
              project={project}
            />
          </DialogTemplate>
          <DialogTemplate
            title="Delete Project"
            contentText="Are you sure you want to delete this project"
            actionBtnText="Remove Project"
            actionFunc={handleDeleteProject}
            trigger={{
              type: "normal",
              text: "Delete Project",
              icon: "bi-pencil-square",
              iconStyle: { marginRight: '10px' },
            }}
          />
        </>
      ) :
      <DialogTemplate
        title="Leave Project"
        contentText="Are you sure you want to leave this project"
        actionBtnText="Leave Project"
        actionFunc={handleDeleteProject}
        trigger={{
          type: "normal",
          text: "Leave Project",
          icon: "bi-pencil-square",
          iconStyle: { marginRight: '10px' },
        }}
      />
  }

  if (project) {
    return (
      <div className="projectPage">
        <div className="projectPageTables">
          <Card>
            <Card.Body>
              <div className="projectPageHeader">
                <h1 className="display-6">{project.projectName}</h1>
              </div>
              <p className="display">{project.description}</p>
              <hr />
              <div className="subtitle">
                <p><strong>Admin: {project.createdBy.username}</strong></p>
                <p><em>Created At: {formatDateTime(project.createdAt)}</em></p>
              </div>
              <div className="pageButtons">
                <button className="btn btn-outline-primary" onClick={toggle}>{show ? "HIDE MEMBERS" : "SHOW MEMBERS"}</button>
                {adminButtons()}
              </div>

              <Collapse in={show}>
                <div className={"assignedDeveloperTable"}>
                  <i className="bi bi-people"></i>
                  <h4 className="h4">Members</h4>
                  <TestTable
                    columns={usersColumns}
                    data={userData}
                    small
                  />
                </div>
              </Collapse>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <DialogTemplate
                title="Edit Issue"
                actionBtnText="Create Issue"
                dialogType="form"
                trigger={{
                  type: "menu",
                  text: "Create Issue",
                  icon: "bi-pencil-square",
                  iconStyle: { marginRight: '10px' },
                }}
              >
                <IssuesForm
                  projectId={projectId}
                />
              </DialogTemplate>
              {isMobile ?
                <IssueListMobile issueData={issueData} />
                :
                <div className="issuesTable">
                  <TestTable
                    title="Issues"
                    columns={issueColumns}
                    data={issueData}
                    small
                  />
                </div>
              }
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

