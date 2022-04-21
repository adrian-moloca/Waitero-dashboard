import React from 'react';
import {useHistory, withRouter } from "react-router-dom";
import {Drawer, Grid, Box} from '@material-ui/core';
import SideMenuContainer from '../container/side-menu/side-menu-container';
import { withStyles } from '@material-ui/core';
import {History, RestaurantMenu, SupervisorAccount, Settings, ViewQuilt} from '@material-ui/icons';
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

const SideMenuPublic = (props) =>{

    const history = useHistory();

    return(

        <MyDrawer variant='permanent' anchor='left'>
            <SideMenuContainer>
                <Box mt='10%' width='100%'>
                    <MyButtonGroup value={props.currentPage}
                                   exclusive 
                                   orientation='vertical'>
                        <MyButton value='overview' onClick={()=>history.push('/overview')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <ViewQuilt fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5} justifyContent='flex-start'>
                                OVERVIEW
                            </Grid>
                        </MyButton>
                        <MyButton value='menus' onClick={()=>history.push('/menus')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <RestaurantMenu fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                MENIURI
                            </Grid>
                        </MyButton>
                        <MyButton value='orders' onClick={()=>history.push('/orders')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <History fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                COMENZI
                            </Grid>
                        </MyButton>
                        <MyButton value='work-staff' onClick={()=>history.push('/work-staff')}>
                            <Grid container item xs={4} justifyContent='center'>
                                <SupervisorAccount fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                PERSONAL
                            </Grid>
                        </MyButton>
                        <MyButton value='restaurants' onClick={()=>history.push('/restaurants')}>
                        <Grid container item xs={4} justifyContent='center'>
                                <Settings fontSize='large'/>
                            </Grid>
                            <Grid container item xs={5}  justifyContent='flex-start'>
                                SETARI
                            </Grid>
                        </MyButton>
                    </MyButtonGroup>
                </Box>
            </SideMenuContainer>
        </MyDrawer>

    );
}

export default withRouter(SideMenuPublic);