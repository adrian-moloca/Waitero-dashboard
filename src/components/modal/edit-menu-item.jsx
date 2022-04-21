import React from 'react';
import { Box, Modal, Fade } from '@material-ui/core';
import useStyles from './modal-style';

const EditMenuItem = ({isModalOpen, setIsModalOpen, item }) => {
    
    const classes = useStyles();

    return (
        <>
            <Modal open={isModalOpen} onClose={()=>setIsModalOpen(false) } back>
                <Fade in={isModalOpen} timeout={600}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
                        <Box display="flex" mt={3} fontSize={22}>
                            {item?.plateName}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    ); 
}

export default EditMenuItem;