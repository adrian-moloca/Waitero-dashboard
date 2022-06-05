import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Box, Grid, FormControlLabel, CircularProgress} from '@material-ui/core';
import LoginContainer from '../../components/container/login-page/login-page-container';
import LoginBox from '../../components/box/login-page/primary-box-login-page';
import WaiteroTextField from '../../components/text-field/waitero-text-field';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton';
import WaiteroCheckbox from '../../components/checkbox/waitero-checkbox';
import { Link } from 'react-router-dom';
import { loginA } from '../../api/api-admin/login-admin';
import { connect } from 'react-redux';
import WaiteroSwitch from '../../components/switch/waitero-switch';
import { rememberMeToggle, cleanErrorMessage } from '../../redux/types/AdminTypes';
import { withRouter } from 'react-router-dom';
import WaiteroAlert from '../../components/alert/alert';

const Login = ({ loginAdmin, rememberMeToggleAdmin, cleanErrorMessageA, rememberMe, adminData }) => { 

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [adminLog, setAdminLog] = useState(false);

  const history = useHistory();

  const setNavigation = (path) => {
    history.push(path)
  }

  const loginHandler = () => {
    if (adminLog)
      loginAdmin(email, password, setLoading, setNavigation)
  }

  const rememberMeToggleHandler = (newValue) => {
    if (adminLog)
      rememberMeToggleAdmin(newValue)
  }

  return (
    <LoginContainer>
      <WaiteroAlert isError={adminData.hasErrors} message={adminData.message} cleanError={cleanErrorMessageA}/>
      <LoginBox>
          <Box marginBottom={2} fontSize={25}>
            Autentificare
          </Box>
          <Grid container item xl={7} lg={7} md={7} spacing={2}>
              <Grid container item justifyContent='space-between' xs={12} xl={12}>
                <Grid container item justifyContent='flex-end' xs={4} lg={4} md={4}>
                  <Box>Client</Box>
                </Grid>
                <Grid container item justifyContent='center' xs={4} lg={4} md={4} style={{height: 30}}>
              <WaiteroSwitch defaultValue={adminLog} onChange={() => setAdminLog(!adminLog)} />
                </Grid>
                <Grid container item justifyContent='flex-start' xs={4} lg={4} md={4}>
                  <Box>Admin</Box>
                </Grid>
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue = {email} onBlur = {(e)=> setEmail(e.target.value)} 
                                label='email' variant='outlined' fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={12} md={12}>
                <WaiteroTextField defaultValue= {password} onBlur = {(e)=> setPassword(e.target.value)} 
                                label='Parola' variant='outlined' type='password' fullWidth/>
              </Grid>
              <Grid container item xl={12} lg={6} md={6}>
            <FormControlLabel defaultChecked={rememberMe} onChange={(e)=>rememberMeToggleHandler(e.target.checked) }control={<WaiteroCheckbox/>} 
                                  label='Remind me' style={{color:'rgba(255, 90, 95, 1)'}}/>
              </Grid>
              <Grid container item xl={12} lg={6} md={6} justifyContent='flex-end' alignItems='center'>
                <Link to='/login/forgot-password' style={{color:'rgba(255, 90, 95, 1)', textDecoration:'none', fontSize: '17px'}}>
                  Am uitat parola
                </Link>
              </Grid>
              <Grid container item xl={12} lg={12} md={12} >
                  <PrimaryButton variant='contained' onClick={() => loginHandler()} fullWidth>{loading ? <CircularProgress size={30}/> : 'AUTENTIFICARE'}</PrimaryButton>
              </Grid>
          </Grid>
        </LoginBox>
      </LoginContainer>
  );
}

const mapStateToProps = state => ({
  rememberMe: state.adminReducer.rememberMe,
  adminData: state.adminReducer
});

const mapDispatchToProps = dispatch => ({
  loginAdmin: (email, password, setLoading, setNavigation) => dispatch(loginA(email, password, setLoading, setNavigation)),
  rememberMeToggleAdmin: (newStatus) => dispatch(rememberMeToggle(newStatus)),
  cleanErrorMessageA: () => dispatch(cleanErrorMessage())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
