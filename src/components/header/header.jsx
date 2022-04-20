import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonBase, Popover, Box } from '@material-ui/core';
import { KeyboardArrowDown, HighlightOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const Header = () => {

    const[anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <MyAppBar position="fixed">
            <MyToolbar variant="dense">
                <ButtonBase onClick={handleClick}>
                    <Box color='white' display='flex'>
                        <Box fontSize='19px'>Buna ziua, John!</Box>
                        <Box mx='3px'><KeyboardArrowDown/></Box>
                    </Box>
                </ButtonBase>
                <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                        transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                    <Link to='/login' style={{textDecoration:'none'}}>
                        <ButtonBase onClick={()=>localStorage.setItem('isLoggedIn', false)}>
                            <Box display='flex' paddingX= '15px' paddingY='10px'>
                                <Box display='flex' mr='5px' color='red' alignSelf='flex-end'><HighlightOff/></Box>
                                <Box display='flex' fontSize='18px' fontWeight='500' color='black' alignSelf='center'>Iesire din cont</Box>
                            </Box>
                        </ButtonBase>
                    </Link>
                </Popover>
            </MyToolbar>
        </MyAppBar>
    );
}

export default Header;