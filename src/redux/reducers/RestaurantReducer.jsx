import {
    GET_RESTAURANT_REQUEST, GET_RESTAURANT_SUCCESS, GET_RESTAURANT_FAILURE,
    CLEAN_ERROR_MESSAGE, CLEAN_RESTAURANT_REDUCER,
    GET_MENUS_REQUEST, GET_MENUS_SUCCESS, GET_MENUS_FAILURE
} from '../types/RestaurantTypes';

let initial = {
    loading: false,
    hasErrors: false,
    message: "",
    rememberMe: false,
    restaurant: {}
}

const restaurantReducer = (state = initial, action) => {
    switch (action.type) {
        //Get
        case GET_RESTAURANT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_RESTAURANT_SUCCESS:
            return{
                ...state,
                restaurant: action.payload.restaurant,
                message: action.payload.message, 
                loading: false,
                hasErrors: false
            }
        case GET_RESTAURANT_FAILURE:
            return{
                ...state,
                hasErrors: true,
                message: action.payload,
                loading: false
            }
        case CLEAN_ERROR_MESSAGE: 
            return {
                ...state,
                message: '',
                hasErrors: false
            }
        case CLEAN_RESTAURANT_REDUCER:
            return {
                ...initial
            }
        case GET_MENUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_MENUS_SUCCESS:
            return {
                ...state,
                loading: true,
                hasErrors: false,
                message: action.payload.message,
                restaurant: {
                    ...state.restaurant,
                    menus: action?.payload?.menus || []
                }
            }
        case GET_MENUS_FAILURE:
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

export default restaurantReducer;