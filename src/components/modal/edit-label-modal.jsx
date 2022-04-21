import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, withStyles, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import PrimaryButton from '../buttons/primaryButton/primaryButton';
import { Close, Edit, SaveAlt } from '@material-ui/icons';

const MyBox = withStyles({
    root:{
        display:'flex', 
        width:'80%',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'15px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Box);

const EditLabelModal = ({ label, setLabel}) => {
    
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const memoLabel = useRef(label);

    function returnBack() {
        setLabel(memoLabel.current)
        setOpen(false);
    }

    return (
        <>
        <IconButton onClick={() => setOpen(true)} size={'small'} style={{marginLeft: 15}}><Edit size={ 14 } /></IconButton>
        <Modal open={open} onClose={ returnBack } back>
            <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
            <Box display="flex" mt={3}>
            <Box mr={2} width={400}>
                <WaiteroTextField value={label} onChange={(e)=>setLabel(e.target.value)} fullWidth/>
              </Box>
              <Box ml={2}>
                                <IconButton onClick={returnBack}><Close color='error' size={25}/></IconButton>
            </Box>
            <Box ml={2}>
                <IconButton onClick={() => { setOpen(false) } }><SaveAlt style={{color: 'rgba(0,110,10)', fontSize: 25}}/></IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
        </Modal>
        </>
    ); 
}

export default EditLabelModal;