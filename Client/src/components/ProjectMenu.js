import React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProject } from "../store/actions/projectActions"
import DialogTemplate from "./DialogTemplate"
import ProjectForm from "./ProjectForm"

export function ProjectMenu({ project }) {
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <i
      className="bi bi-three-dots-vertical"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    ></i>
  ))
  const dispatch = useDispatch()
  const handleDeleteProject = () => dispatch(deleteProject(project._id))

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-basic-button"
          title="Dropdown button"
        />

        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={`/projects/${project._id}`}
            href="#/action-2"
          >
            <i style={{ marginRight: "10px" }} className="bi bi-link-45deg"></i>
            View Project
          </Dropdown.Item>
          <DialogTemplate
            title="Edit Project"
            dialogType="form"
            trigger={{
              type: "menu",
              text: "Edit Project",
              icon: "bi-pencil-square",
            }}
          >
            <ProjectForm project={project} edit />
          </DialogTemplate>
          <DialogTemplate
            title="Remove Project"
            contentText="Are you sure you want to remove this project"
            actionBtnText="Remove Project"
            actionFunc={handleDeleteProject}
            trigger={{
              type: "menu",
              text: "Remove Project",
              icon: "bi-trash",
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
