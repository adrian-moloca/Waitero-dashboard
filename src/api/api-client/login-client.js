import { clientsUrl }from '../../utils/costants/constants';
import { fetchClientRequest, fetchClientSuccess, fetchClientFailure } from '../../redux/types/ClientTypes';
import axios from 'axios';

export const loginC = (email, password, loadingSetter = () => undefined, setNavigation = () => undefined) => {
    const loginPath = 'login'
    loadingSetter(true)
    return async (dispatch) => {
        dispatch(fetchClientRequest())
        axios.post(clientsUrl + loginPath, {
            email: email,
            password: password
        }).then(res => {
            dispatch(fetchClientSuccess(res.data))
            setNavigation('/overview');
        }).catch(error => {
            dispatch(fetchClientFailure(error.response.data.error))
            console.log(error)
        }).finally(() => {loadingSetter(false) })  
    }
}

