import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideMenuPrivate from '../../components/side-menu/side-menu-private';
import SideMenuPublic from '../../components/side-menu/side-menu-public';
import Header from '../../components/header/header';

function ProtectedRoute({ component: Component, loggedIn, ...restOfProps }) {
    const[currentPage, setCurrentPage] = useState(window.location.pathname.replace('/', ''));

    const isWaiteroManager = true;

    useEffect(() => {
        setCurrentPage(window.location.pathname.replace('/', ''))
    }, [window.location.pathname])

    return (
    <React.Fragment>
        <Header/>
        {isWaiteroManager ? <SideMenuPrivate currentPage={currentPage}/> : <SideMenuPublic currentPage={currentPage}/>}
        <Route
            {...restOfProps}
            render={(props) =>
            localStorage.getItem('isLoggedIn') === 'true' ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    </React.Fragment>
    );
}

export default ProtectedRoute;