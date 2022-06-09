import { cwaxios } from "../../utils/axios-config";
import { addRestaurantRequest, addRestaurantSuccess, addRestaurantFailure } from "../../redux/types/ClientTypes";

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
    }).catch((error) => {
        errorSetter(error?.response?.data?.message || 'cannot update')
    }).finally(() => {
        loadingSetter(false);
        closeModalEdit();
    })
}