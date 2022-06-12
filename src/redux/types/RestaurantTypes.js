// CLIENT action types
export const GET_RESTAURANT_REQUEST = 'GET_RESTAURANT_REQUEST';
export const GET_RESTAURANT_SUCCESS = 'GET_RESTAURANT_SUCCESS';
export const GET_RESTAURANT_FAILURE = 'GET_RESTAURANT_FAILURE';

export const CLEAN_ERROR_MESSAGE = 'CLEAN_ERROR_MESSAGE';

export const CLEAN_RESTAURANT_REDUCER = 'CLEAN_RESTAURANT_REDUCER';

export const GET_MENUS_REQUEST = 'GET_MENUS_REQUEST';
export const GET_MENUS_SUCCESS = 'GET_MENUS_SUCCESS';
export const GET_MENUS_FAILURE = 'GET_MENUS_FAILURE';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const GET_PLATES_REQUEST = 'GET_PLATES_REQUEST';
export const GET_PLATES_SUCCESS = 'GET_PLATES_SUCCESS';
export const GET_PLATES_FAILURE = 'GET_PLATES_FAILURE';
// Functions
// CLIENT fetch functions
export const fetchRestaurantRequest = () => {
    return {
        type: GET_RESTAURANT_REQUEST
    };
};

export const fetchRestaurantSuccess = (response) => {
    return {
        type: GET_RESTAURANT_SUCCESS,
        payload: response
    };
};

export const fetchRestaurantFailure = (error) => {
    return {
        type: GET_RESTAURANT_FAILURE,
        payload: error
    };
};

export const cleanErrorMessageRestaurant = () => {
    return {
        type: CLEAN_ERROR_MESSAGE
    }
}

export const cleanRestaurant = () => {
    return {
        type: CLEAN_RESTAURANT_REDUCER
    }
}

export const getMenusRequest = () => {
    return {
        type: GET_MENUS_REQUEST
    };
};

export const getMenusSuccess = (response) => {
    return {
        type: GET_MENUS_SUCCESS,
        payload: response
    };
};

export const getMenusFailure = (error) => {
    return {
        type: GET_MENUS_FAILURE,
        payload: error
    };
};

export const getCategoriesRequest = () => {
    return {
        type: GET_CATEGORIES_REQUEST
    };
};

export const getCategoriesSuccess = (response) => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: response
    };
};

export const getCategoriesFailure = (error) => {
    return {
        type: GET_CATEGORIES_FAILURE,
        payload: error
    };
};

export const getPlatesRequest = () => {
    return {
        type: GET_PLATES_REQUEST
    };
};

export const getPlatesSuccess = (response) => {
    return {
        type: GET_PLATES_SUCCESS,
        payload: response
    };
};

export const getPlatesFailure = (error) => {
    return {
        type: GET_PLATES_FAILURE,
        payload: error
    };
};