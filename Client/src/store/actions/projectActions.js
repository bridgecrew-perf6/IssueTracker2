import { apiCall } from "../../services/api"
import { ADD_PROJECT, LOAD_PROJECTS, REMOVE_PROJECTS, UPDATE_PROJECTS } from "../actionTypes"
import { addError, removeError } from './errorActions'
//api call syntax apiCall(method, path, payload)

function loadProjects(projects) {
  return {
    type: LOAD_PROJECTS,
    projects
  }
}

function addProject(project) {
  return {
    type: ADD_PROJECT,
    project
  }
}

function updateProject(newProject) {
  return {
    type: UPDATE_PROJECTS,
    project: newProject
  }
}

function removeProject(id) {
  return {
    type: REMOVE_PROJECTS,
    id
  }
}

export function getProjects() {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("get", `/${id}/api/projects`)
      .then(res => dispatch(loadProjects(res)))
      .catch(err => dispatch(addError(err.message)))
  }
}

export function postProject(projectData, closeModal) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { currentUser } = getState()
      const { id } = currentUser.user
      apiCall("post", `api/users/${id}/projects`, projectData)
        .then(res => {
          dispatch(removeError())
          dispatch(addProject(res))
          closeModal()
          resolve()
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject()
        })
    })
  }
}

export function patchProject(projectId, projectData, closeModal) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { currentUser } = getState()
      const { id } = currentUser
      apiCall("patch", `/api/users/${id}/projects/${projectId}`, projectData)
        .then(res => {
          dispatch(updateProject(res.project))
          closeModal()
          resolve()
        })
        .catch(err => {
          console.log("patch")
          dispatch(addError(err.message))
          reject()
        })
    })
  }
}

export function deleteProject(projectId, history) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("delete", `/api/users/${id}/projects/${projectId}`)
      .then(res => {
        history.push("/projects")
        dispatch(removeProject(res.project._id))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export function leaveProject(projectId) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("delete", `/api/users/${id}/projects/${projectId}/leave`)
      .then(res => {
        dispatch(updateProject(res.project))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}