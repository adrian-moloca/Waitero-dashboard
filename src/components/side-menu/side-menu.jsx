import React from 'react';
import {useHistory, withRouter } from "react-router-dom";
import {Drawer, Grid, Box} from '@material-ui/core';
import SideMenuContainer from '../container/side-menu/side-menu-container';
import { withStyles } from '@material-ui/core';
import {Home, Computer, Person, NotListedLocation} from '@material-ui/icons';
import {ToggleButton , ToggleButtonGroup} from '@material-ui/lab';

const MyDrawer = withStyles({

    root:{
        width: '18%',
    },

    paper:{
        width:'18%',
        border: 0,
        boxShadow: ' 5px 0 0 rgba(0, 0, 0, 0.31)',
    },

})(Drawer);

const MyButton = withStyles({

    root:{
        padding: 0,
        width: '100%',
        color:'white',
        border:'none',
    },

    label:{
        alignItems:'center',
        justifyContent:'start',
        fontSize:'25px',
        fontWeight:'Bold',
    },

})(ToggleButton);

const MyButtonGroup = withStyles({

    root:{
        width: '100%',
    },

})(ToggleButtonGroup);

const SideMenu = (props) =>{

    const history = useHistory();

    return(

        <MyDrawer variant='permanent' anchor='left'>
            <SideMenuContainer>
                <Box mt='10%' width='100%'>
                    <MyButtonGroup value={props.currentPage}
                                   exclusive
                                   onChange={props.onChangePage} 
                                   orientation='vertical'>
                        <MyButton value='home' onClick={()=>history.push('/home')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <Home fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5} justifyContent='flex-start'>
                                ACASA
                            </Grid>
                        </MyButton>
                        <MyButton value='statistics' onClick={()=>history.push('/statistics')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <Computer fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                STATISTICI
                            </Grid>
                        </MyButton>
                        <MyButton value='users' onClick={()=>history.push('/users')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <Person fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                UTILIZATORI
                            </Grid>
                        </MyButton>
                        <MyButton value='location' onClick={()=>history.push('/location')}>
                        <Grid container item xs={4} justifyContent='center'>
                                <NotListedLocation fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                LOCATII
                            </Grid>
                        </MyButton>
                    </MyButtonGroup>
                </Box>
            </SideMenuContainer>
        </MyDrawer>

    );
}

export default withRouter(SideMenu);