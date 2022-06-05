// USER action types
// Constants
// Get
export const GET_CLIENT_REQUEST = 'GET_CLIENT_REQUEST';
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

export const REMEMBER_ME_TOGGLE = 'REMEMBER_ME_TOGGLE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';

export const CLEAN_CLIENT_REDUCER = 'CLEAN_CLIENT_REDUCER';

// Functions
// USER fetch functions
export const fetchClientRequest = () => {
    return {
        type: GET_CLIENT_REQUEST
    };
};

export const fetchClientSuccess = (response) => {
    return {
        type: GET_CLIENT_SUCCESS,
        payload: response
    };
};

export const fetchClientFailure = (error) => {
    return {
        type: GET_CLIENT_FAILURE,
        payload: error
    };
};

export const rememberMeToggleClient = (newStatus) => {
    return {
        type: REMEMBER_ME_TOGGLE,
        payload: newStatus
    };
};

export const cleanErrorMessageClient = () => {
    return {
        type: CLEAN_ERROR_MESSAGE
    }
}

export const cleanClient = () => {
    return {
        type: CLEAN_CLIENT_REDUCER
    }
}
