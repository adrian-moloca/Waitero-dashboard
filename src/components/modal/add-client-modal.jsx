import React, {useState} from 'react';
import PrimaryButton from '../buttons/primaryButton/primaryButton';
import { Modal, Fade, Box, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroTextField from '../text-field/waitero-text-field';
import SecondaryButton from '../buttons/secondaryButton/secondaryButton';
import { addClient } from '../../api/api-admin/add-client';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cleanErrorMessage } from '../../redux/types/AdminTypes';

const AddClientModal = ({addClientA}) => {
    
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const addClientHandler = () => {
        addClientA(name, email, phone, password, setLoading, setIsOpen)
        cleanModal();
    }

    const cleanModal = () => {
        setEmail('');
        setName('');
        setPassword('');
        setPhone('');
    }

    return (
        <>
        <Box>
            <PrimaryButton
                variant="contained"
                color="primary"
                style={{fontWeight: "600", width:250}}
                onClick={()=>setIsOpen(true)}
            >
                ADAUGA CLIENTI
            </PrimaryButton>
        </Box>
            <Modal open={isOpen} onClose={() => { setIsOpen(false);}}>
            <Fade in={isOpen} timeout={600}>
                    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" className={classes.paper}>
                        <Box>Adaugare client..</Box>
                    <Box marginTop={10}>
                        <Grid container justifyContent='space-around' spacing={3}>
                            <Grid container item xs={5}>
                                <WaiteroTextField placeholder='Nume' fullWidth defaultValue={name} onBlur={(t) => setName(t.target.value)} />
                            </Grid>
                            <Grid container item xs={5}>
                                <WaiteroTextField placeholder='Email' fullWidth defaultValue={email} onBlur={(t) => setEmail(t.target.value)} />
                            </Grid>
                            <Grid container item xs={5}>
                                <WaiteroTextField placeholder='Password' type={'password'} fullWidth defaultValue={password} onBlur={(t) => setPassword(t.target.value)} />
                            </Grid>
                            <Grid container item xs={5}>
                                <WaiteroTextField placeholder='Phone number' fullWidth defaultValue={phone} onBlur={(t) => setPhone(t.target.value)} />
                            </Grid>
                        </Grid>
                        </Box>
                    <Box marginTop={6}>
                        <Grid container justifyContent='space-between' spacing={3}>
                            <Grid container item xs={5}>
                                <PrimaryButton onClick={()=> addClientHandler()} variant={'contained'} style={{fontWeight: "600", width:250}}>
                                        {loading ? <CircularProgress size={22}/> : 'ADAUGA CLIENT'}
                                </PrimaryButton>
                            </Grid>
                            <Grid container item xs={5}>
                                <SecondaryButton onClick={() =>setIsOpen(false)} variant={'outlined'} style={{fontWeight: "600", width:250}}>
                                    RENUNTA
                                </SecondaryButton>
                            </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );

}

const mapDispatchToProps = (dispatch) => ({
    addClientA: (name, email, phone, password, loadingSetter, closeModalAddClient) => dispatch(addClient(name, email, phone, password, loadingSetter, closeModalAddClient)),
    cleanErrorMessage: () => dispatch(cleanErrorMessage())
})
export default withRouter(connect(null, mapDispatchToProps)(AddClientModal));