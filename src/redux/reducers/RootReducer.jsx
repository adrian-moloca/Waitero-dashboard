import adminReducer from './AdminReducer';
import clientReducer from './ClientReducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    //User Reducer
    adminReducer: adminReducer,
    clientReducer: clientReducer
})

export default RootReducer;