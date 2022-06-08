import { cwaxios } from "../../utils/axios-config";
import { addRestaurantRequest, addRestaurantSuccess, addRestaurantFailure } from "../../redux/types/ClientTypes";

export const addRestaurant = (restaurantName, restaurantCuisines, clientId, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(addRestaurantRequest());
        cwaxios.post(clientId + '/add-restaurant', {
            restaurantName: restaurantName,
            restaurantCuisines: restaurantCuisines
        }).then((res) => {
            dispatch(addRestaurantSuccess(res.data));
            setNavigation('/overview')
        }).catch((error) => {
            console.log(error);
            dispatch(addRestaurantFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}