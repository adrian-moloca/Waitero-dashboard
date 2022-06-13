import React, { useEffect, useState } from 'react';
import { Box, Modal, withStyles, Fade, IconButton, CircularProgress } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import { updateClientPassword, updateRestaurantField } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';

const ResetPasswordModal = ({ open, setOpen = () => undefined, clientId }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message: '', isError: false});
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const classes = useStyles();

  const closeModal=()=>{
    setOldPassword('');
    setNewPassword('')
    setOpen(-1)
  }

  const updateField = () => {
    updateClientPassword(oldPassword, newPassword, clientId, setLoading, setError, closeModal)
  }

  return (
    <>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
      <Modal open={open} onClose={ closeModal }>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3}>
              <Box mr={2} width={400}>
                <WaiteroTextField value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={'Parola actuala'} type={'password'} fullWidth />
              </Box>
              <Box mr={2} width={400}>
                <WaiteroTextField value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={'Parola noua'} type={'password'} fullWidth />
              </Box>
              <Box ml={2}>
                <IconButton onClick={ closeModal }><Close color='error' size={25} /></IconButton>
              </Box>
              <Box ml={2}>
                {loading ? <CircularProgress size={25}/> : <IconButton onClick={() => updateField()}><SaveAlt style={{ color: 'rgba(0,110,10)', fontSize: 25 }} /></IconButton>}    
                </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default connect(null, null)(ResetPasswordModal);