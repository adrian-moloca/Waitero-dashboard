import React, { useRef, useState } from 'react';
import { Box, Modal, withStyles, Fade, IconButton, InputAdornment } from '@material-ui/core';
import WaiteroTextField from '../text-field/waitero-text-field';
import useStyles from './modal-style';
import { Add, Close, Delete, Edit, SaveAlt } from '@material-ui/icons';

const EditStringArrayModal = ({ array, setArray}) => {
    
    const [open, setOpen] = useState(false);
    const [itemT, setItemT] = useState('');
    const classes = useStyles();
    const memoArray = useRef(array);

    function returnBack() {
        setArray(memoArray.current)
        setOpen(false);
    }

    function deleteItem(index) {
        const temp = [...array];
        temp.splice(index, 1)
        setArray(temp);
    }

    function addItem() {
        setArray(array.concat([itemT]))
        setItemT('')
    }

    return (
        <>
        <IconButton onClick={() => setOpen(true)} size={'small'} style={{marginLeft: 15}}><Edit size={ 14 } /></IconButton>
        <Modal open={open} onClose={ returnBack } back>
            <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
            <Box display="flex" mt={3}>
              <Box mr={2} width={400}>
                <Box>{array.length ? array.map((item, index) => {
                    return (
                        <Box style={{backgroundColor: 'rgba(255, 90, 95, 0.1)', width: 'max-content', borderRadius: 5, padding: 3, margin: 5}}>
                            <span>{ item }</span>
                            <IconButton onClick={() => deleteItem(index)} size={'small'} style={{marginLeft: 15}}><Delete color='error' size={ 16 } /></IconButton>
                        </Box>
                )}) : null }</Box>
                    <WaiteroTextField value={itemT} onChange={(e) => setItemT(e.target.value)} InputProps={{
                        endAdornment: (
                            <InputAdornment position={"start"}>
                                <IconButton onClick={() => addItem()} size={'small'}>
                                    <Add size={ 16 }/>
                                </IconButton>
                            </InputAdornment>    
                        )
                    }} onKeyDown={(event)=>event.key === 'Enter' ? addItem() : null} fullWidth/>
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

export default EditStringArrayModal;