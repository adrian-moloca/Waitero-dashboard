import React, {useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideMenu from '../../components/side-menu/side-menu';
import Header from '../../components/header/header';

function ProtectedRoute({ component: Component, loggedIn, ...restOfProps }) {
    const[currentPage, setCurrentPage] = useState(window.location.pathname.substr(1));

    return (
    <React.Fragment>
        <Header/>
        <SideMenu currentPage={currentPage} onChangePage={()=> setCurrentPage(window.location.pathname.substr(1))}/>
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