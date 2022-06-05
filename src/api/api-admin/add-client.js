import { awaxios } from "../../utils/axios-config";
import { addClientRequest, addClientSuccess, addClientFailure } from "../../redux/types/AdminTypes";

export const addClient = (name, email, phone, password, loadingSetter = () => undefined, closeModalAddClient = () => undefined) => {
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(addClientRequest());
        awaxios.post('add-client', {
            name: name,
            email: email,
            phone: phone,
            password: password
        }).then((res) => {
            dispatch(addClientSuccess(res));
            closeModalAddClient(false)
        }).catch((error) => {
            dispatch(addClientFailure(error.response.data.error));
        }).finally(()=>loadingSetter(false))
    }
}