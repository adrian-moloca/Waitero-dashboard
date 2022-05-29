import React, {useState} from 'react';
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

import './Routing.css';

const Routes = () => {

    const [collapsed, setCollapsed] = useState(false);
    
    const isWaiteroManager = false;

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/login/forgot-password" component={ForgotPassword}/>
                <Route exact path="/reset-password" component={ResetPassword}/>
                <ProtectedRoute exact path="/home" component={HomePage} />
                <ProtectedRoute exact path="/statistics" component={StatisticsPage} />
                <ProtectedRoute exact path="/users" component={UsersPage} />
                <ProtectedRoute exact path="/restaurants" component={RestaurantsPage} />
                <ProtectedRoute exact path="/overview" component={Overview} />
                <ProtectedRoute exact path="/work-staff" component={WorkStaff} />
                <ProtectedRoute exact path="/menus" component={Menus} />
                <ProtectedRoute exact path="/orders" component={Orders} />
                <ProtectedRoute exact path="/settings" component={Settings} />
                <ProtectedRoute path="*" component={isWaiteroManager ? HomePage : Overview} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;