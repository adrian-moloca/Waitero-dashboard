import React, { useState } from 'react';
import { Box, Modal, Fade, Grid, CircularProgress, IconButton } from '@material-ui/core';
import useStyles from './modal-style';
import WaiteroAlert from '../alert/alert';
import { connect } from 'react-redux';
import PrimaryButton from '../buttons/primaryButton/primaryButton';
import SecondaryButton from '../buttons/secondaryButton/secondaryButton';
import { deleteCategory, deleteMenu, deletePlate, deleteDrink, deleteExtra, getCategories, getMenus, getPlates, getDrinks, getExtra } from '../../api/api-client/client-requests';
import { Delete } from '@material-ui/icons';
import { deleteClient, getClients } from '../../api/api-admin/admin-requests';

const DeleteModalWithIcon = ({ type, message, clientId=undefined, restaurantId=undefined, menuId=undefined, categoryId=undefined, plateId=undefined, drinkId=undefined, extraId=undefined, getMenus, getCategories, getPlates, getDrinks, getExtra, getClients}) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message: '', isError: false});
  const classes = useStyles();

  const closeModalOnMenuDelete = () => {
    getMenus(clientId, restaurantId, setLoading);
    setOpen(false);
  }

  const closeModalOnCategoryDelete = () => {
    getCategories(clientId, restaurantId, menuId, setLoading);
    setOpen(false);
  }

  const closeModalOnPlateDelete = () => {
    getPlates(clientId, restaurantId, menuId, categoryId, setLoading);
    setOpen(false);
  }

  const closeModalOnDrinkDelete = () => {
    getDrinks(clientId, restaurantId, setLoading);
    setOpen(false);
  }

  const closeModalOnExtraDelete = () => {
    getExtra(clientId, restaurantId, setLoading);
    setOpen(false);
  }

  const closeModalOnClientDelete = () => {
    getClients(setLoading);
    setOpen(false);
  }

  const handleDeleteClick = () => {
    if(type === 'menu'){
        deleteMenu(clientId, restaurantId, menuId, setLoading, setError, closeModalOnMenuDelete)        
    } else if(type === 'category'){
        deleteCategory(clientId, restaurantId, menuId, categoryId, setLoading, setError, closeModalOnCategoryDelete)
    } else if(type === 'plate'){
        deletePlate(clientId, restaurantId, menuId, categoryId, plateId, setLoading, setError, closeModalOnPlateDelete)
    } else if (type === 'drink'){
        deleteDrink(clientId, restaurantId, drinkId, setLoading, setError, closeModalOnDrinkDelete)        
    } else if (type === 'extra'){
        deleteExtra(clientId, restaurantId, extraId, setLoading, setError, closeModalOnExtraDelete)        
    } else if (type === 'client'){
        deleteClient(clientId, setLoading, setError, closeModalOnClientDelete)
    }
  }

  return (
    <>
      <IconButton onClick={ ()=>setOpen(true) }><Delete color='error'/></IconButton>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open} timeout={600}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.paper}>
              <Box width={400} my={2} display={'flex'} justifyContent='center'>
                {message}
              </Box>
              <Box mr={2} width={400} my={2}>
                <Grid container justifyContent='space-between'>                                
                    <Grid container item xs={5}>
                        <SecondaryButton variant={'outlined'} onClick={()=>setOpen(false)} fullWidth>INAPOI</SecondaryButton>
                    </Grid>
                    <Grid container item xs={5}>
                        <PrimaryButton variant={'contained'} onClick={()=>handleDeleteClick()} fullWidth>{loading ? <CircularProgress size={20}/> : 'STERGE'}</PrimaryButton>
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
    getMenus: (clientId, restaurantId, loadingSetter) => dispatch(getMenus(clientId, restaurantId, loadingSetter)),
    getCategories: (clientId, restaurantId, menuId, loadingSetter) => dispatch(getCategories(clientId, restaurantId, menuId, loadingSetter)),
    getPlates: (clientId, restaurantId, menuId, categoryId, loadingSetter) => dispatch(getPlates(clientId, restaurantId, menuId, categoryId, loadingSetter)),
    getDrinks: (clientId, restaurantId, loadingSetter) => dispatch(getDrinks(clientId, restaurantId, loadingSetter)),
    getExtra: (clientId, restaurantId, loadingSetter) => dispatch(getExtra(clientId, restaurantId, loadingSetter)),
    getClients: (loadingSetter) => dispatch(getClients(loadingSetter))
})

export default connect(null, mapDispatchToProps)(DeleteModalWithIcon);