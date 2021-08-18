import axios from "axios";
import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errorActions";

export function setUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function setTokenHeader(token) {
    if (token) { 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
           apiCall('post', `api/auth/${type}`, userData)
           .then(({token, ...userInfo}) => {
                localStorage.setItem("jwt", token)
                setTokenHeader(token)
                dispatch(setUser(userInfo))
                dispatch(removeError())
                resolve()
           })
           .catch(err => {
               dispatch(addError(err.message))
               reject() 
           }) 
        })
    }
}