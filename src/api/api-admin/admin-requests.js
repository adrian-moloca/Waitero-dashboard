import { awaxios } from "../../utils/axios-config";
import { getClientsRequest, getClientsSuccess, getClientsFailure } from "../../redux/types/AdminTypes";

export const getClients = (loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getClientsRequest());
        awaxios.get('get-clients').then((res) => {
            dispatch(getClientsSuccess(res.data));
        }).catch((error) => {
            console.log(error);
            dispatch(getClientsFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}