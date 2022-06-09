import React, { useEffect, useState } from 'react';
import { Box, Modal, Fade, IconButton } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import useStyles from './modal-style';
import { Close, Edit, SaveAlt } from '@material-ui/icons';
import { restaurant_categories } from '../../utils/costants/constants';
import { updateRestaurantField } from '../../api/api-client/client-requests';
import WaiteroAlert from '../alert/alert';

const EditStringArrayModal = ({ labelName, array, setArray = () =>undefined, clientId, restaurantId}) => {
    
    const [open, setOpen] = useState(false);
    const [itemT, setItemT] = useState(array);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        setItemT(array)
    }, [array])

    const onCategoryClick = (category) => {
        if (itemT.includes(category))
            setItemT(cuisines => cuisines.filter(cat => cat !== category))
        else
            setItemT(cuisines => cuisines.concat([category]))
    }

    const updateField = () => {
        updateRestaurantField({ [labelName]: itemT }, clientId, restaurantId, setArray, setLoading, setError, setOpen);
      }

    return (
        <>
        <IconButton onClick={() => setOpen(true)} size={'small'} style={{marginLeft: 15}}><Edit size={ 14 } /></IconButton>
        <WaiteroAlert isError={error.length > 0} message={error} cleanError={() => setError('')} />
        <Modal open={open} onClose={() => setOpen(false)}>
            <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
            <Box display="flex" mt={3}>
              <Box mr={2} width={800}>
                {restaurant_categories.map((category) => {
                        return <ToggleButton style={{marginRight: 10, marginTop: 10, fontSize: 16}} selected={itemT.includes(category)} onChange={() => onCategoryClick(category)}>
                            {category}        
                        </ToggleButton>
                })}
              </Box>
              <Box ml={2}>
                    <IconButton onClick={()=>setOpen(false)}><Close color='error' size={25}/></IconButton>
            </Box>
            <Box ml={2}>
                <IconButton onClick={() => updateField()}><SaveAlt style={{color: 'rgba(0,110,10)', fontSize: 25}}/></IconButton>
              </Box>
            </Box>
          </Box>
        </Fade>
        </Modal>
        </>
    ); 
}

export default EditStringArrayModal;