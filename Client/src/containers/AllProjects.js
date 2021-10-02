import React, { useMemo } from 'react'
import ProjectForm from '../components/ProjectForm'
import TestTable from '../components/TestTable'
import { projectColumns } from '../data/columns'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import DialogTemplate from '../components/DialogTemplate'
import Card from 'react-bootstrap/Card'
import ProjectListMobile from '../components/ProjectListMobile'
import '../styles/allProjects.css'

function AllProjects({ history }) {
  const { projects } = useSelector(state => state)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const columns = useMemo(() => projectColumns(), [])
  const projectData = useMemo(() => projects ? projects : [], [projects])

  return (
    <div className="allProjectsContainer">
      <Card>
        <Card.Body>
          <div className="allProjectsTitle">
            <h1 className="display-6">Projects</h1>
            <DialogTemplate
              title="Create Project"
              dialogType="form"
              trigger={{
                type: "menu",
                text: "Create Project",
                icon: "bi-pencil-square",
              }}
            >
              <ProjectForm editMode={null} />
            </DialogTemplate>
          </div>
          {isMobile
            ? <ProjectListMobile projects={projects} />
            : <TestTable columns={columns} data={projectData} />
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default AllProjects