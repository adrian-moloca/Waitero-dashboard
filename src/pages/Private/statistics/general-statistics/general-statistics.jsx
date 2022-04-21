import React from 'react';
import {Grid, Box} from '@material-ui/core';
import GeneralStatisticsBox from '../../../../components/box/general-statistics-box/general-statistics-box';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const general_statistics = [
    { 
      title: 'Total venituri lunare',
      content: '15.000 RON',
      subInfo:'Luna aceasta',
    },
    { 
        title: 'Total venituri',
        content: '15.000 RON',
        subInfo:'Toate timpurile',
    },
    { 
        title: 'Total utilizatori',
        content: '537',
        subInfo:'Toate timpurile',
    },

]

const MyGrid=withStyles({
    container:{
        flexWrap:'inherit',
    },
})(Grid)

const GeneralStatistics = () =>{

    return (
        <MyGrid container flexDirection='row'>
            {general_statistics.map((box)=>
                <Grid container item justifyContent='center'>
                    <GeneralStatisticsBox title = {box.title} content={box.content} subInfo={box.subInfo}/>
                </Grid>
            ) } 
        </MyGrid>
    );
}

export default GeneralStatistics;