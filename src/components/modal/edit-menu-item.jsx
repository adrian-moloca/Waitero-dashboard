import React, { useEffect, useState } from 'react';
import { Box, Modal, Fade, Grid, InputAdornment, IconButton } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroTextField from '../text-field/waitero-text-field';
import { RESTAURANT } from '../../pages/menus/data';
import { Add, Close, Delete, SaveAlt } from '@material-ui/icons';

const EditMenuItem = ({isModalOpen, setIsModalOpen, item, setItem }) => {
    
    const classes = useStyles();

    const [tempItem, setTempItem] = useState(item);
    const [newIngredient, setNewIngredient] = useState('')

    function addItem() {
        setTempItem({ ...tempItem, plateIngredients: tempItem?.plateIngredients?.concat([ newIngredient ]) });
        setNewIngredient('');
    }

    function deleteItem(index) {
        const temp = [...tempItem.plateIngredients];
        temp.splice(index, 1)
        setTempItem({...tempItem, plateIngredients: temp});
    }

    function returnBack() {
        setIsModalOpen();
    }

    const setEdits = (item, index) => {
        const tempIngredients = [...tempItem.plateIngredients]
        tempIngredients.splice(index, 1, item)
        setTempItem({ ...tempItem, plateIngredients: tempIngredients })    
    }

    function saveItem() {
        setItem(tempItem);
        setIsModalOpen();
    }

    useEffect(() => {
        if (item)
            setTempItem(item) 
    }, [item])

    return (
        <>
            <Modal open={isModalOpen} onClose={()=>returnBack() } back>
                <Fade in={isModalOpen} timeout={600}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  className={classes.paper}>       
                        <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem?.plateName} onChange={(e) => setTempItem({ ...tempItem, plateName: e.target.value })} placeholder='Nume preparat' fullWidth />
                            </Box>
                            <Box mr={2} width={400}>
                                <WaiteroTextField value={tempItem?.platePrice} onChange={(e) => setTempItem({ ...tempItem, platePrice: e.target.value })} placeholder='Pret preparat' fullWidth />
                            </Box>
                        <Box display="flex" mt={3} width='80%' fontSize={22}>
                            <Grid container justifyContent='space-between'>
                                {tempItem?.plateIngredients?.map((ing, index) => {
                                    return (
                                        <Grid container item xs={5}>
                                            <WaiteroTextField fullWidth defaultValue={ing} onChange={(t) => setEdits(t.target.value, index)}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position={"start"}>
                                                                        <IconButton onClick={() => deleteItem(index)} size={'small'}>
                                                                            <Delete size={ 16 }/>
                                                                        </IconButton>
                                                                    </InputAdornment>    
                                                                )
                                                            }}/>
                                        </Grid>
                                    )
                                }) || "Ingredients can't be read"}
                                <Grid container item xs={5}>
                                <WaiteroTextField value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={"start"}>
                                            <IconButton onClick={() => addItem()} size={'small'}>
                                                <Add size={ 16 }/>
                                            </IconButton>
                                        </InputAdornment>    
                                    )
                                }} onKeyDown={(event)=>event.key === 'Enter' ? addItem() : null} fullWidth/>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box display="flex" mt={3}>
                            <Box ml={2}>
                                    <IconButton onClick={returnBack}><Close color='error' size={25}/></IconButton>
                            </Box>
                            <Box ml={2}>
                                <IconButton onClick={saveItem}><SaveAlt style={{color: 'rgba(0,110,10)', fontSize: 25}}/></IconButton>
                            </Box>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    ); 
}

export default EditMenuItem;