import React, { useState } from 'react';
import { Box, Modal, Fade, IconButton } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Close, SaveAlt } from '@material-ui/icons';

const AddMenuModal = ({ isOpen, setIsOpen, createMenuType}) => {
    
    const classes = useStyles();
    const [name, setName] = useState('');

    function returnBack() {
        setIsOpen();
        setName('');
    }

    function createMenuTypeAction(name) {
        createMenuType(name);
        setName('');
    }

    return (
        <>
            <Modal open={isOpen} onClose={() => returnBack()} back>
            <Fade in={isOpen} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
            <Box display="flex" mt={3}>
                <Box mr={2} width={400}>
                    <WaiteroTextField placeholder='Name' value={name} onKeyDown={(key)=>key.key === 'Enter' && createMenuTypeAction(name)} onChange={(e)=>setName(e.target.value)} fullWidth/>
                </Box>
                <Box ml={2}>
                    <IconButton onClick={returnBack}><Close color='error' size={25}/></IconButton>
                </Box>
            <Box ml={2}>
                <IconButton onClick={() => { createMenuTypeAction(name) } }><SaveAlt style={{color: 'rgba(0,110,10)', fontSize: 25}}/></IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
        </Modal>
        </>
    ); 
}

export default AddMenuModal;