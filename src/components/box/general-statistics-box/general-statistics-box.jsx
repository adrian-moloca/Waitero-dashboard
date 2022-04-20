import React from 'react';
import { Box, withStyles } from '@material-ui/core';

const MyBox = withStyles({

    root:{
        display:'flex', 
        flexDirection:'column',
        width:'80%',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Box);

const GeneralStatisticsBox = ({title, content, subInfo})=>{
    return(
        <MyBox  >
            <Box width='100%' textAlign='center' fontSize='22px' fontStyle='' fontWeight={300} paddingTop='5%' paddingBottom='5%' >
                {title}
            </Box>
            <Box width='100%' textAlign='center' fontSize='40px' fontStyle='italic' fontWeight={600} color='#00b4d8' 
                paddingTop='5%' paddingBottom='5%' >
                {content}
            </Box>
            <Box width='100%' textAlign='center'paddingTop='5%' paddingBottom='5%' fontSize='19px' fontWeight={500} color='grey.500'>
                {subInfo}
            </Box>
        </MyBox>
    ); 
}

export default GeneralStatisticsBox;