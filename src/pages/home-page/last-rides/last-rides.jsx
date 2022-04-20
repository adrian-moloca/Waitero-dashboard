import React from 'react';
import {Grid} from '@material-ui/core';
import LastRidesBox from '../../../components/box/last-rides-box/last-rides-box';

const last_rides=[
    {departure: 'Timisoara', destination:'Bucuresti', departureAddress: 'Lorem Ipsium Street', destinationAddress:'Lorem Ipsium Street',
     packageType: 'Mic', dimensions:'0x0x0', weight:'1 KG', description:'-', price: '150 lei', name:'Pachetul meu', date:'31/08/2021 14:00'},
     {departure: 'Timisoara', destination:'Bucuresti', departureAddress: 'Lorem Ipsium Street', destinationAddress:'Lorem Ipsium Street',
     packageType: 'Mic', dimensions:'0x0x0', weight:'1 KG', description:'-', price: '150 lei', name:'Pachetul meu', date:'31/08/2021 14:00'},
     {departure: 'Timisoara', destination:'Bucuresti', departureAddress: 'Lorem Ipsium Street', destinationAddress:'Lorem Ipsium Street',
     packageType: 'Mic', dimensions:'0x0x0', weight:'1 KG', description:'-', price: '150 lei', name:'Pachetul meu', date:'31/08/2021 14:00'},
     {departure: 'Timisoara', destination:'Bucuresti', departureAddress: 'Lorem Ipsium Street', destinationAddress:'Lorem Ipsium Street',
     packageType: 'Mic', dimensions:'0x0x0', weight:'1 KG', description:'-', price: '150 lei', name:'Pachetul meu', date:'31/08/2021 14:00'},
     {departure: 'Timisoara', destination:'Bucuresti', departureAddress: 'Lorem Ipsium Street', destinationAddress:'Lorem Ipsium Street',
     packageType: 'Mic', dimensions:'0x0x0', weight:'1 KG', description:'-', price: '150 lei', name:'Pachetul meu', date:'31/08/2021 14:00'},
]

const LastRides = ()=>{
    return(

        <Grid container direction='column' spacing={3}>
            {last_rides.map((ride)=>
                <Grid container item justifyContent='center'>
                    <LastRidesBox departure={ride.departure} destination={ride.destination} departureAddress={ride.departureAddress}
                             destinationAddress={ride.destinationAddress} packageType={ride.packageType} dimensions={ride.dimensions}
                             weight={ride.weight} description={ride.description} price={ride.price} name={ride.name} date={ride.date}/>
                </Grid>  
            )}
        </Grid>

    );
}

export default LastRides;