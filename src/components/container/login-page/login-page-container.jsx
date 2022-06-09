import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CarroLogo from '../../../assets/images/logoCarro.png';

const MyContainer = withStyles({
    

    root:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        backgroundColor:'rgba(255, 90, 95, 1)',
        //minHeight:'100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        px:'10px',
    },

    maxWidthLg :{
        maxWidth: '100%',
    },

})(Container);

const LoginContainer = (props) =>{
    return(
        <MyContainer>
            <Box maxWidth='100%' paddingTop={props.paddingTop || '6%'} paddingBottom={3} display='flex' justifyContent='center'
                fontSize={60} color={'white' }>
                WAITERO
            </Box>
            <Box width='750px' display='flex' alignSelf='center'>
                {props.children}
            </Box>
        </MyContainer>
    );
}

export default LoginContainer;