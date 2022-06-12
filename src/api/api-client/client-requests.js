import { cwaxios } from "../../utils/axios-config";
import { addRestaurantRequest, addRestaurantSuccess, addRestaurantFailure, getRestaurantsRequest, getRestaurantsSuccess, getRestaurantsFailure } from "../../redux/types/ClientTypes";
import { getMenusFailure, getMenusRequest, getMenusSuccess } from "../../redux/types/RestaurantTypes";

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

export const getMenus = (clientId, restaurantId, loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getMenusRequest());
        cwaxios.get(`${clientId}/restaurant/${restaurantId}/get-menus`).then((res) => {
            dispatch(getMenusSuccess(res.data));
        }).catch((error) => {
            dispatch(getMenusFailure(error?.response?.data?.message));
        }).finally(() => loadingSetter(false))
    }
}

export const addMenu = async (menuName, clientId, restaurantId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalAdd = () => undefined) => {
    loadingSetter(true);
    cwaxios.post(`${clientId}/restaurant/${restaurantId}/add-menu`, {
        menuName: menuName
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalAdd();
        window.location.reload()
    })
}