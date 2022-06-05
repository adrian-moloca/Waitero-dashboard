import {
    GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS, GET_ADMIN_FAILURE,
    REMEMBER_ME_TOGGLE, CLEAN_ERROR_MESSAGE, CLEAN_ADMIN_REDUCER, 
    ADD_CLIENT_REQUEST, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAILURE
} from '../types/AdminTypes';

let initial = {
    loading: false,
    hasErrors: false,
    message: "",
    rememberMe: false,
    admin: {
        access: "",
        email: "",
        loggedIn: false,
        name: "",
        phone: "",
        role: "",
        _id: ""
    }
}

const adminReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case GET_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_SUCCESS:
            return{
                ...state,
                admin: action.payload.admin,
                message: action.payload.message, 
                loading: false,
                hasErrors: false
            }
        case GET_ADMIN_FAILURE:
            return{
                ...state,
                hasErrors: true,
                message: action.payload,
                loading: false
            }
        case REMEMBER_ME_TOGGLE:
            return {
                ...state,
                rememberMe: action.payload
            }
        case CLEAN_ERROR_MESSAGE: 
            return {
                ...state,
                message: '',
                hasErrors: false
            }
        case CLEAN_ADMIN_REDUCER:
            return {
                ...initial
            }
        case ADD_CLIENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: action.payload.message
            }
        case ADD_CLIENT_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action.payload
            }
        default: 
            return  {
                ...state
            }
    }
}

export default adminReducer;