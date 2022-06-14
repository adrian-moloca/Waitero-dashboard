import { awaxios } from "../../utils/axios-config";
import { getClientsRequest, getClientsSuccess, getClientsFailure } from "../../redux/types/AdminTypes";

export const getClients = (loadingSetter = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(getClientsRequest());
        awaxios.get('get-clients').then((res) => {
            dispatch(getClientsSuccess(res.data));
        }).catch((error) => {
            dispatch(getClientsFailure(error?.response?.data?.message));
        }).finally(()=>loadingSetter(false))
    }
}

export const deleteClient = async (clientId, loadingSetter = () => undefined, errorSetter = () => undefined, closeModalDelete = () => undefined) => {
    loadingSetter(true);
    awaxios.delete(`/delete-client`, {
        clientId: clientId
    }).then((res) => {
        errorSetter({message: res?.data?.message, isError: false})
    }).catch((error) => {
        errorSetter({message: error?.response?.data?.message || 'cannot update',  isError: true})
    }).finally(() => {
        loadingSetter(false);
        closeModalDelete();
    })
}