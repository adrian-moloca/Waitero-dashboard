import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonBase, Popover, Box } from '@material-ui/core';
import { KeyboardArrowDown, HighlightOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';
import { cleanAdmin } from '../../redux/types/AdminTypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MyAppBar = withStyles({
    
    root:{
        backgroundColor: 'black',
    }

})(AppBar);

const MyToolbar = withStyles({
    root:{
        display:'flex',
        justifyContent: 'flex-end',
        paddingRight:'40px',
        marginLeft:'300px',
    },

})(Toolbar);

const Header = ({name, isAdmin, cleanAdmin}) => {

    const[anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        if (isAdmin === 'admin')
            cleanAdmin()
    }

    return(
        <MyAppBar position="fixed">
            <MyToolbar variant="dense">
                <ButtonBase onClick={handleClick}>
                    <Box color='white' display='flex'>
                        <Box fontSize='19px'>Buna ziua, {name}</Box>
                        <Box mx='3px'><KeyboardArrowDown/></Box>
                    </Box>
                </ButtonBase>
                <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                        transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                    <ButtonBase onClick={()=>logoutHandler()}>
                        <Box display='flex' paddingX= '15px' paddingY='10px'>
                            <Box display='flex' mr='5px' color='red' alignSelf='flex-end'><HighlightOff/></Box>
                            <Box display='flex' fontSize='18px' fontWeight='500' color='black' alignSelf='center'>Iesire din cont</Box>
                        </Box>
                    </ButtonBase>
                </Popover>
            </MyToolbar>
        </MyAppBar>
    );
}

const mapStateToProps = (state) => ({
    name: state?.adminReducer?.admin?.name,
    isAdmin: state?.adminReducer?.admin?.role
})
const mapDispatchToProps = (dispatch) => ({ cleanAdmin: () => dispatch(cleanAdmin()) })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));