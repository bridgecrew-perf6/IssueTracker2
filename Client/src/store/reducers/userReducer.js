import { LOAD_USERS } from "../actionTypes"

export default (state = [], action) => {
    switch(action.type) {
        case LOAD_USERS:
            return [...action.users]
        default: 
            return state
    }
}