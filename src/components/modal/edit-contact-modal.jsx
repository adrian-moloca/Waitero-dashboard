import React, { useState } from 'react';
import { Box, Modal, Grid, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';

const EditContactModal = ({contactObject, setContactObject = () => undefined, clientId, restaurantId }) => {

  const [open, setOpen] = useState(false);
  const [error, setError] = useState({message: '', isError: false});
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [mondayToFriday, setMondayToFriday] = useState({openAt: '', closeAt: ''});
  const [saturday, setSaturday] = useState({openAt: '', closeAt: ''});
  const [sunday, setSunday] = useState({openAt: '', closeAt: ''});
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');

  const classes = useStyles();

  const updateField = () => {

  }

  return (
    <>
      <IconButton onClick={(e) =>{ setOpen(true); e.stopPropagation()}} size={'small'} style={{ marginLeft: 15 }}><Edit size={14} /></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
            <Box display="flex" mt={3}>
               <Grid container spacing={2} justifyContent={'flex-end'}>
                <Grid container item xs ={5}>
                    <WaiteroTextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth placeholder='Numar de telefon' />
                </Grid>
                <Grid container item xs ={5}>
                    <WaiteroTextField value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth  placeholder='Website' />
                </Grid>
                <Grid container item xs ={4}>
                    <Box>Luni-vineri</Box>
                </Grid>
                <Grid container item xs ={4}>
                    <Box>Sambata</Box>
                </Grid>
                <Grid container item xs ={4}>
                    <Box>Duminica</Box>
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={mondayToFriday.openAt} onChange={(e) => setMondayToFriday({...mondayToFriday, openAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={mondayToFriday.closeAt} onChange={(e) => setMondayToFriday({...mondayToFriday, closeAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={saturday.openAt} onChange={(e) => setSaturday({...saturday, openAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={saturday.closeAt} onChange={(e) => setSaturday({...saturday, closeAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={sunday.openAt} onChange={(e) => setSunday({...sunday, openAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={2}>
                    <WaiteroTextField value={sunday.closeAt} onChange={(e) => setSunday({...sunday, closeAt: e.target.value})} fullWidth placeholder='00:00' />
                </Grid>
                <Grid container item xs ={5}>
                    <WaiteroTextField value={facebook} onChange={(e) => setFacebook(e.target.value)} fullWidth placeholder='Facebook link' />
                </Grid>
                <Grid container item xs ={5}>
                    <WaiteroTextField value={instagram} onChange={(e) => setInstagram(e.target.value)} fullWidth  placeholder='Instagram link' />
                </Grid>
              </Grid>
              <Box ml={2}>
                <IconButton onClick={() => setOpen(false)}><Close color='error' size={25} /></IconButton>
              </Box>
              <Box ml={2}>
                <IconButton onClick={() => updateField()}><SaveAlt style={{ color: 'rgba(0,110,10)', fontSize: 25 }} /></IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default connect(null, null)(EditContactModal);