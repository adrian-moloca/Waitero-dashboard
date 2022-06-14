import {
    GET_RESTAURANT_REQUEST, GET_RESTAURANT_SUCCESS, GET_RESTAURANT_FAILURE,
    CLEAN_ERROR_MESSAGE, CLEAN_RESTAURANT_REDUCER,
    GET_MENUS_REQUEST, GET_MENUS_SUCCESS, GET_MENUS_FAILURE,
    GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
    GET_PLATES_REQUEST, GET_PLATES_SUCCESS, GET_PLATES_FAILURE,
    GET_DRINKS_REQUEST, GET_DRINKS_SUCCESS, GET_DRINKS_FAILURE,
    GET_EXTRA_REQUEST, GET_EXTRA_SUCCESS, GET_EXTRA_FAILURE
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
                message: state.message.length === 0 ? action.payload.message : state.message,
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
                loading: false,
                hasErrors: false,
                message: state.message.length === 0 ? action.payload.message : state.message,
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
        case GET_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: state.message.length === 0 ? action.payload.message : state.message,
                restaurant: {
                    ...state.restaurant,
                    categories: action?.payload?.categories || []
                }
            }
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action.payload
            }
        case GET_PLATES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PLATES_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: state.message.length === 0 ? action.payload.message : state.message,
                restaurant: {
                    ...state.restaurant,
                    plates: action?.payload?.plates || []
                }
            }
        case GET_PLATES_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action.payload
            }
        case GET_DRINKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_DRINKS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: state.message.length === 0 ? action.payload.message : state.message,
                restaurant: {
                    ...state.restaurant,
                    drinks: action?.payload?.drinks || []
                }
            }
        case GET_DRINKS_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true,
                message: action.payload
            }
        case GET_EXTRA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_EXTRA_SUCCESS:
            return {
                ...state,
                loading: false,
                hasErrors: false,
                message: state.message.length === 0 ? action.payload.message : state.message,
                restaurant: {
                    ...state.restaurant,
                    extra: action?.payload?.extras || []
                }
            }
        case GET_EXTRA_FAILURE:
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