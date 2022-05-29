import { initialState } from '../../interfaces/StateInterface.js';
import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from '../types/UserTypes';

let initial = {
    loading: false,
    hasErrors: false,
    user: {
        _id: '',
        isWaiteroManager: false,
        isLoggedIn: false,
        token: '',
        user_details: {
           username: '',
           email: '',
           phoneNumber: '',
           lastName: '',
           firstName: '',
           dateOfBirth: ''
        }
    }
}

const userReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case "GET_USER_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "GET_USER_SUCCESS":
            return{
                ...state,
             user: action.payload,
            }
        case "GET_USER_FAILURE":
            return{
                ...state,
                hasErrors: true,
            }
        default: 
            return  {
                ...state,
            }
    }
}

export default userReducer;