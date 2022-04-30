// USER action types
// Constants
// Get
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

// Functions
// USER fetch functions
export const fetchUserRequest = () => {
    return {
        type: GET_USER_REQUEST,
    };
};

export const fetchUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    };
};

export const fetchUserFailure = (error) => {
    return {
        type: GET_USER_FAILURE,
        payload: error
    };
};


