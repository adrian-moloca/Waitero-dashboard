import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CarroLogo from '../../../assets/images/logoCarro.png';

const MyContainer = withStyles({
    

    root:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        backgroundColor:'#00b4d8',
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
            <Box maxWidth='100%' height='120px' top={0} left={0} right={0} padding={5} paddingBottom='5%' display='flex' justifyContent='center' >
                <img src={CarroLogo}/>
            </Box>
            <Box width='650px' display='flex' alignSelf='center'>
                {props.children}
            </Box>
        </MyContainer>
    );
}

export default LoginContainer;