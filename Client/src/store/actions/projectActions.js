import { apiCall } from "../../services/api";
import { ADD_PROJECT, LOAD_PROJECTS, REMOVE_PROJECTS, UPDATE_PROJECTS } from "../actionTypes";
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

function updateProject(id, newProject) {
    return {
        type: UPDATE_PROJECTS,
        id,
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
    return dispatch => {
        apiCall("get", "/api/projects")
            .then(res => dispatch(loadProjects(res)))
            .catch(err => dispatch(addError(err.message)))
    }
}

export function postProject(projectData) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const { currentUser } = getState()
            const { id } = currentUser.user
            apiCall("post", `api/users/${id}/projects`, projectData)
                .then(res => {
                    dispatch(removeError())
                    dispatch(addProject(res))
                    resolve()
                })
                .catch(err => {
                    dispatch(addError(err.message))
                    reject()
                })
        })
    }
}

export function patchProject(projectId, projectData) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const { currentUser } = getState()
            const { id } = currentUser
            apiCall("patch", `/api/users/${id}/projects/${projectId}`, projectData)
                .then(res => { 
                    dispatch(updateProject(res.project._id, res.project))
                    resolve()
                })
                .catch(err => {
                    dispatch(addError(err.message))
                    reject()
                })
        })
    }
}

export function deleteProject(projectId) {
    return (dispatch, getState) => {
        const { currentUser } = getState()
        const { id } = currentUser.user
        apiCall("delete", `/api/users/${id}/projects/${projectId}`)
            .then(res => dispatch(removeProject(res.project._id)))
            .catch(err => {
                dispatch(addError(err.message))
            })
    }
}