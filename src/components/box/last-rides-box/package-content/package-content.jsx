import React from 'react';
import { Grid } from '@material-ui/core';
import Fragile from '../../../../assets/images/fragile.png';
import Environment from '../../../../assets/images/environmentdang.png';
import Fire from '../../../../assets/images/firedang.png';
import Hands from '../../../../assets/images/boxHands.png';
import Prints from '../../../../assets/images/animalPrints.png';
import { withStyles } from '@material-ui/styles';

const MyGrid = withStyles({

    root:{
        height:'35px',
        width:'auto',
        justifyContent:'center',
    }

})(Grid)

const PackageContent = ( )=>{

    return(
        <Grid container item xs={2} alignItems='center' justifyContent='center'>
            <MyGrid container item xs={4}>
                <img src={Fragile}/>
            </MyGrid>
            <MyGrid container item xs={4}>
                <img src={Environment}/>
            </MyGrid>
            <MyGrid container item xs={4}>
                <img src={Fire}/>
            </MyGrid>
            <MyGrid container item xs={4}>
                <img src={Hands}/>
            </MyGrid>
            <MyGrid container item xs={4}>
                <img src={Prints}/>
            </MyGrid>
        </Grid>
    );

}

export default PackageContent;