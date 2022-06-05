import React from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import HomePage from '../../pages/Private/home-page/home-page';
import StatisticsPage from '../../pages/Private/statistics/statistics';
import UsersPage from '../../pages/Private/users/users';
import RestaurantsPage from '../../pages/Private/restaurants/restaurants';
import ResetPassword from '../../pages/reset-password/reset-password';
import Overview from '../../pages/overview/overview';
import WorkStaff from '../../pages/work-staff/work-staff';
import Menus from '../../pages/menus/menus';
import Orders from '../../pages/orders/orders';
import Settings from '../../pages/settings/settings';
import { connect } from 'react-redux';
import './Routing.css';

const Routes = ({ isUserAdmin, isUserLoggedIn }) => {

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <ProtectedRoute exact path="/home" component={HomePage} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/statistics" component={StatisticsPage} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/users" component={UsersPage} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/clients" component={RestaurantsPage} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/overview" component={Overview} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/work-staff" component={WorkStaff} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/menus" component={Menus} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/orders" component={Orders} loggedIn={isUserLoggedIn} role={isUserAdmin} />
                <ProtectedRoute exact path="/settings" component={Settings}  loggedIn={isUserLoggedIn} role={isUserAdmin}/>
                <ProtectedRoute path="*" component={isUserAdmin === 'admin' ? HomePage : Overview} loggedIn={isUserLoggedIn} role={isUserAdmin} />
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    isUserAdmin: state.adminReducer?.admin?.role,
    isUserLoggedIn: state.adminReducer?.admin?.loggedIn || state?.clientReducer?.client.loggedIn
})
                                            
export default connect(mapStateToProps, null)(Routes);