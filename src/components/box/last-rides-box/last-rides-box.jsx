import React from 'react';
import {Box, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import RideDetails from './ride-details/ride-details';
import PackageContent from './package-content/package-content';

const MyBox = withStyles({

    root:{
        display:'flex',
        padding:'13px',
        justifyContent:'center',
        width:'92%',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Box);

const LastRidesBox = (props) =>{

    return(

        <MyBox>
            <Grid container xs={12} justifyContent='center'>
                <RideDetails departure={props.departure} destination={props.destination} departureAddress={props.departureAddress}
                             destinationAddress={props.destinationAddress} packageType={props.packageType} dimensions={props.dimensions}
                             weight={props.weight} description={props.description} price={props.price} name={props.name}/>
                <PackageContent/>
                <Grid container item xs={12} alignItems='center' justifyContent='center'>
                    <Box display='flex' height='50px' alignItems='center' fontSize='22px' fontWeight='600' color='grey.700'>
                        {props.date}
                    </Box>
                </Grid>
            </Grid>
        </MyBox>

    );
}

export default LastRidesBox;