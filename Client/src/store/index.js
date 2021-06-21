import { combineReducers, createStore } from "redux";

const rootReducer = (state = ["whatever"], action) => {
    console.log("1st")
    switch(action.type) {
        case "JUST":
            return ["asshole"]
        default: 
            return state
    }
}

const rootReducers = (state = ["eversWhat"], action) => {
    console.log("2nd")
    switch(action.type) {
        case "JUSTICE":
            return state
        default: 
            return state
    }
}


export default function configureStore() {
    const red = combineReducers({rootReducer, rootReducers})
    const store = createStore(red)
    // const store = createStore(rootReducer)
    return store
}


