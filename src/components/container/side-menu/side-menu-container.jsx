import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CarroLogo from '../../../assets/images/logoCarro.png';

const MyContainer = withStyles({
    

    root:{
        display:'flex',
        flexDirection:'column',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:'#00b4d8',
        //minHeight:'100vh',
        height: '100%',
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
    },

    maxWidthLg :{
        maxWidth: '100%',
    },

})(Container);

const SideMenuContainer = (props) =>{
    return(
        <MyContainer>
            <Box maxWidth='100%'  padding={5} display='flex' justifyContent='center'>
                <img src={CarroLogo}/>
            </Box>
            <Box width='100%' display='flex' alignSelf='center'>
                {props.children}
            </Box>
            <Box position='absolute' bottom={0} width='100%' height='5%' borderTop={2} paddingTop={1} color='white' 
                textAlign='center' fontStyle='italic' fontWeight={500}>
                2021 CARRO TRANSPORT
            </Box>
        </MyContainer>
    );
}

export default SideMenuContainer;
