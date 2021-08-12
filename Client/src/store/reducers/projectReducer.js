import { ADD_PROJECT, LOAD_PROJECTS, REMOVE_PROJECTS, UPDATE_PROJECTS } from "../actionTypes"

export default (state = [], action) => {
    switch(action.type) {
        case LOAD_PROJECTS: 
            return [...action.projects]
        case ADD_PROJECT:
            return [...state, action.project]
        case REMOVE_PROJECTS: 
            return state.filter(project => project._id !== action.id )
        case UPDATE_PROJECTS:
            return state.map(project => (
                project._id === action.id ? { ...action.project } : project
            )) 
        default:
            return state
    }
}