import React, {useState} from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import HomePage from '../../pages/home-page/home-page';
import StatisticsPage from '../../pages/statistics/statistics';
import UsersPage from '../../pages/users/users';
import LocationPage from '../../pages/location/location';
import ResetPassword from '../../pages/reset-password/reset-password';
import './Routing.css';

const Routes = () => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () =>  setCollapsed(!collapsed);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/login/forgot-password" component={ForgotPassword}/>
                <Route exact path="/reset-password" component={ResetPassword}/>
                <ProtectedRoute exact path="/home" component={HomePage} />
                <ProtectedRoute exact path="/statistics" component={StatisticsPage} />
                <ProtectedRoute exact path="/users" component={UsersPage} />
                <ProtectedRoute exact path="/location" component={LocationPage} />
                <ProtectedRoute path="*" component={HomePage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
