import {combineReducers} from 'redux';
import userReducer from './UserReducer';

const RootReducer = combineReducers({
    //User Reducer
    userData: userReducer,

})

export default RootReducer;