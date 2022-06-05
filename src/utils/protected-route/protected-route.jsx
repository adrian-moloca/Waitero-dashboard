import React, {useLayoutEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideMenuPrivate from '../../components/side-menu/side-menu-private';
import SideMenuPublic from '../../components/side-menu/side-menu-public';
import Header from '../../components/header/header';
import { useHistory } from 'react-router-dom';

function ProtectedRoute({ component: Component, loggedIn, role, ...restOfProps }) {
    
    const history = useHistory();

    const[currentPage, setCurrentPage] = useState(history.location.pathname);


    useLayoutEffect(() => {
        setCurrentPage(history.location.pathname)
    }, [history.location.pathname])

    return (
    <React.Fragment>
        <Header/>
        {role === 'admin' ? <SideMenuPrivate currentPage={currentPage}/> : <SideMenuPublic currentPage={currentPage}/>}
        <Route
            {...restOfProps}
            render={(restOfProps) =>
                loggedIn ? <Component {...restOfProps} /> : <Redirect to="/login" />
            }
        />
    </React.Fragment>
    );
}

export default ProtectedRoute;