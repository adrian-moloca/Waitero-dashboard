import {
    GET_CLIENT_REQUEST, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE,
    REMEMBER_ME_TOGGLE, CLEAN_ERROR_MESSAGE, CLEAN_CLIENT_REDUCER
} from '../types/ClientTypes';

let initial = {
    loading: false,
    hasErrors: false,
    message: "",
    rememberMe: false,
    client: {
        access: "",
        email: "",
        loggedIn: false,
        name: "",
        phone: "",
        role: "",
        _id: ""
    }
}

const clientReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case GET_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CLIENT_SUCCESS:
            return{
                ...state,
                client: action.payload.client,
                message: action.payload.message, 
                loading: false,
                hasErrors: false
            }
        case GET_CLIENT_FAILURE:
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
        case CLEAN_CLIENT_REDUCER:
            return {
                ...initial
            }
        default: 
            return  {
                ...state
            }
    }
}

export default clientReducer;