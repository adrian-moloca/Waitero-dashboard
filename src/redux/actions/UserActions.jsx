import { LOGIN_USER } from '../../utils/queries/login';
import { useMutation } from '@apollo/client';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../types/UserTypes';


export const loginUser = (username, password) => {
    return (dispatch) => {
        dispatch(fetchUserRequest());
        const [login] = useMutation(LOGIN_USER, {
            fetchPolicy: "no-cache",
            variables: {
                user_name: username,
                user_password: password
            },
            onCompleted: (data) => {
                if(data.login !== null) {
                    fetchUserSuccess(data.login)
                    window.location.reload();
                } else {
                    alert('Wrong credentials...');
                }
            },
            onError: (err) => {
                fetchUserFailure(err);
            }
        });
    }
}