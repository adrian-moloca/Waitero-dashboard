import adminReducer from './AdminReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    //User Reducer
    adminReducer: adminReducer
})

export default RootReducer;