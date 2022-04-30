import React, { useState, useEffect } from 'react';
import {useHistory, withRouter, Redirect } from 'react-router-dom';
import {Box, Grid, FormControlLabel} from '@material-ui/core';
import LoginContainer from '../../components/container/login-page/login-page-container';
import LoginBox from '../../components/box/login-page/primary-box-login-page';
import WaiteroTextField from '../../components/text-field/waitero-text-field';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton';
import CarroCheckbox from '../../components/checkbox/carro-checkbox';
import { Link } from 'react-router-dom';

const Login = () => { 

  const[remindMe, setRemindMe] = useState(false);

  const[Email, setEmail] = useState("");

  const[Password, setPassword] = useState("");

  const history = useHistory();

  const handleRemindMe = (event) =>{

    !event.target.checked ? setRemindMe(false) : setRemindMe(true)
  }

  useEffect(()=>{
    if((localStorage.getItem('isLoggedIn')==='true')) 
                history.push('/home')
  }, [])

  return (
      <LoginContainer>
        <LoginBox>
          <Box marginBottom={8} fontSize={25}>
            Autentificare
          </Box>
          <Grid container item xl={7} lg={7} md={7} spacing={3}>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField value = {Email} onChange = {(e)=> setEmail(e.target.value)} 
                                label='Email' variant='outlined' fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField value= {Password} onChange = {(e)=> setPassword(e.target.value)} 
                                label='Parola' variant='outlined' fullWidth/>
              </Grid>
              <Grid container item xl={6} lg={6} md={6}>
                <FormControlLabel onChange={(e)=>handleRemindMe(e) }control={<CarroCheckbox/>} 
                                  label='Remind me' style={{color:'rgba(255, 90, 95, 1)'}}/>
              </Grid>
              <Grid container item xl={6} lg={6} md={6} justifyContent='flex-end' alignItems='center'>
                <Link to='/login/forgot-password' style={{color:'rgba(255, 90, 95, 1)', textDecoration:'none', fontSize: '17px'}}>
                  Am uitat parola
                </Link>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                <Link to='/home' style={{textDecoration: 'none', width:'100%'}}>
                  <PrimaryButton variant='contained' onClick={() => localStorage.setItem('isLoggedIn', true)} fullWidth>AUTENTIFICARE</PrimaryButton>
                </Link>
              </Grid>
          </Grid>
        </LoginBox>
      </LoginContainer>
  );
}

export default withRouter(Login);
