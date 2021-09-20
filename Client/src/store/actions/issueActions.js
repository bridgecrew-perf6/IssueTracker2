import { apiCall } from "../../services/api";
import { ADD_ISSUE, LOAD_ISSUES, REMOVE_ISSUES, UPDATE_ISSUES } from "../actionTypes";
import { addError, removeError } from './errorActions'

//api call syntax apiCall(method, path, payload)
function loadIssues(issues) {
  return {
    type: LOAD_ISSUES,
    issues
  }
}

function updateIssue(id, newIssue) {
  return {
    type: UPDATE_ISSUES,
    id,
    issue: newIssue
  }
}

function removeIssue(id) {
  return {
    type: REMOVE_ISSUES,
    id
  }
}

function addIssue(issue) {
  return {
    type: ADD_ISSUE,
    issue
  }
}
// function addIssueToProject(issue) {
//   return {
//     type: ADD_ISSUE_TO_PROJECT,
//     issue
//   }
// }
// function removeIssueFromProject(issue) {
//   return {
//     type: REMOVE_ISSUE_FROM_PROJECT,
//     issue
//   }
// }

export function getIssues() {
  return dispatch => {
    apiCall("get", "/api/issues")
      .then(res => {
        dispatch(loadIssues(res))
      })
  }
}

export function postIssue(issueData, projectId, closeModal) {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { currentUser } = getState()
      const { id } = currentUser.user
      apiCall("post", `/api/users/${id}/issues/${projectId}/create`, issueData)
        .then(res => {
          dispatch(removeError())
          dispatch(addIssue(res))
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



export function patchIssue(issueId, issueData, closeModal) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const { currentUser } = getState()
      const { id } = currentUser.user
      apiCall("patch", `/api/users/${id}/issues/${issueId}`, issueData)
        .then(res => {
          dispatch(updateIssue(res.issue._id, res.issue))
          dispatch(removeError())
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

export function deleteIssue(issueId) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("delete", `/api/users/${id}/issues/${issueId}`)
      .then(res => {
        dispatch(removeIssue(res.issue._id))
      })
      .catch(err => console.log(err.message))
  }
}

export function updateIssueStatus(issueId, type) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("post", `/api/users/${id}/issues/${issueId}/${type}`)
      .then(res => {
        console.log(res)
        dispatch(updateIssue(res.issue._id, res.issue))
      })
      .catch(err => console.log(err))
  }
}

export function postComment(issueId, comment) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    const { id } = currentUser.user
    apiCall("post", `/api/users/${id}/issues/${issueId}/comment`, { comment })
      .then(res => {
        console.log(res)
        dispatch(updateIssue(res.issue._id, res.issue))
      })
      .catch(err => console.log(err))
  }
}

