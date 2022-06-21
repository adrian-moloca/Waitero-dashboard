import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CarroLogo from '../../../assets/images/logoCarro.png';

const MyContainer = withStyles({
    

    root:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor:'rgba(255, 90, 95, 1)',
        height: '100%',
        width: '100%'
    },

    maxWidthLg :{
        maxWidth: '100%',
    },

})(Container);

const LoginContainer = (props) =>{
    return(
        <MyContainer>
            <Box width='100%' paddingTop={props.paddingTop || '1%'} paddingBottom={3} display='flex' justifyContent='center'
                fontSize={60} color={'white' } textAlign={'center'}>
                WAITERO
            </Box>
            <Box display='flex' width={0.5} justifyContent={'center'} alignItems={'center'}>
                {props.children}
            </Box>
        </MyContainer>
    );
}

export default LoginContainer;