import { ADD_PROJECT, LOAD_PROJECTS, REMOVE_PROJECTS, UPDATE_PROJECTS, REMOVE_USER_FROM_PROJECT } from "../actionTypes"

const projectReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return [...action.projects]
    case ADD_PROJECT:
      return [...state, action.project]
    case REMOVE_PROJECTS:
      return state.filter(project => project._id !== action.id)
    case UPDATE_PROJECTS:
      return state.map(project => (
        project._id === action.id ? { ...action.project } : project
      ))
    case REMOVE_USER_FROM_PROJECT:
      return state.assignedUsers.filter(users => users)
    //functions for if Issues are taken from project Reducer
    // case ADD_ISSUE_TO_PROJECT:
    // return state.map(project => {
    //   return project._id === action.issue.project._id ? { ...project, issues: [...project.issues, action.issue] } : { ...project, [project.issues]: [] }
    // })
    // case REMOVE_ISSUE_FROM_PROJECT:
    //   return state.map(project => {
    //     const filteredIssues = project.issues.filter(issue => action.issue._id !== issue._id)
    //     return project._id === action.issue.project ? { ...project, issues: filteredIssues } : project
    //   })
    default:
      return state
  }
}

export default projectReducer