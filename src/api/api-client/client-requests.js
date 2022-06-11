import { cwaxios } from "../../utils/axios-config";
import { addRestaurantRequest, addRestaurantSuccess, addRestaurantFailure, getRestaurantsRequest, getRestaurantsSuccess, getRestaurantsFailure } from "../../redux/types/ClientTypes";

export const getRestaurants = (clientId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getRestaurantsRequest());
        cwaxios.get(`${clientId}/get-restaurants`).then((res) => {
            dispatch(getRestaurantsSuccess(res.data));
        }).catch((error) => {
            dispatch(getRestaurantsFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}
export const addRestaurant = (restaurantName, restaurantCuisines, clientId, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(addRestaurantRequest());
        cwaxios.post(`${clientId}/add-restaurant`, {
            restaurantName: restaurantName,
            cuisines: restaurantCuisines
        }).then((res) => {
            dispatch(addRestaurantSuccess(res.data));
            setNavigation('/overview')
        }).catch((error) => {
            dispatch(addRestaurantFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}

export const updateRestaurantField = async (fieldObject, clientId, restaurantId, fieldSetter = () => undefined, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalEdit = () => undefined) => {
    loadingSetter(true);
    cwaxios.patch(`${clientId}/restaurant/${restaurantId}/update-restaurant`, fieldObject
    ).then((res) => {
        fieldSetter(res.data.updatedField)
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalEdit();
    })
}

export const deleteRestaurant = async (clientId, restaurantId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    cwaxios.delete(`${clientId}/restaurant/${restaurantId}/delete-restaurant`).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}
