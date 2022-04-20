import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const MyGrid = withStyles({

    root:{
        fontSize:'17px',
        fontWeight:'lighter',
        lineHeight:'1.1',
    }

})(Grid)

const RideDetails = (props) =>{
    return(

        <Grid container item xs={9}>
            <MyGrid container item xs={6}>
                Plecare: {props.departure}
            </MyGrid>
            <MyGrid container item xs={6}>
                Destinatie: {props.destination}
            </MyGrid>
            <MyGrid container item xs={6}>
                Adresa de preluare: {props.departureAddress}
            </MyGrid>
            <MyGrid container item xs={6}>
                Adresa destinatie: {props.destinationAddress}
            </MyGrid>
            <MyGrid container item xs={6}>
                Tip colet: {props.packageType}
            </MyGrid>
            <MyGrid container item xs={6}>
                Dimensiuni: {props.dimensions}
            </MyGrid>
            <MyGrid container item xs={6}>
                Greutate: {props.weight}
            </MyGrid>
            <MyGrid container item xs={6}>
                Descriere: {props.description}
            </MyGrid>
            <MyGrid container item xs={6}>
                Pret: {props.price}
            </MyGrid>
            <MyGrid container item xs={6}>
                Nume: {props.name}
            </MyGrid>
        </Grid>

    );
}

export default RideDetails;