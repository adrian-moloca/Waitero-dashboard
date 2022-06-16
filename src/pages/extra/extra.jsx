import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Grid } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import { Add, ArrowBack, Close, Edit, SaveAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { addExtra, getExtra, updateExtra } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import WaiteroTextField from '../../components/text-field/waitero-text-field.jsx';
import { numberValidator } from '../../utils/functions/input-validators.js';

const Extra = ({ restaurants, extra, clientData, restaurantReducer, getExtra, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(''); 
  const [newExtraName, setNewExtraName] = useState(''); 
  const [newExtraPrice, setNewExtraPrice] = useState('');
  const [itemOnEditValues, setItemOnEditValues] = useState({extraName: '', extraPrice: ''})

  const [loadingOnAdd, setLoadingOnAdd] = useState(false);
  const [error, setError] = useState({ message: '', isError: false });
  const [onEditItem, setOnEditItem] = useState({index: -1, loading: false});

  const goBackMenuSelection = () => {
    setRestaurantSelected('')
  }

  const resetFields = () => {
    setNewExtraName('')
    setNewExtraPrice('')
  } 

  const resetExistentExtra = () => {
    setOnEditItem({index: -1, loading: false});
    setItemOnEditValues({extraName: '', extraPrice: ''})
  }

  const refreshMyExtras = () => {
    resetFields();
    getExtra(clientData.id, restaurantSelected)
  }

  const refreshMyExtrasOnUpdate = () => {
    resetExistentExtra();
    getExtra(clientData.id, restaurantSelected)
  }

  const addExtraToList = () => {
    addExtra(newExtraName, parseFloat(newExtraPrice), clientData.id, restaurantSelected, setLoadingOnAdd, setError, refreshMyExtras)
  }

  const updateExtraFromList = (extraId) => {
    updateExtra(itemOnEditValues.extraName, parseFloat(itemOnEditValues.extraPrice), clientData.id, restaurantSelected, extraId,(stat) => setOnEditItem({...onEditItem, loading: stat}), setError, refreshMyExtrasOnUpdate)
  }

  const clickedEditOnItem = (index, defaultNameValue, defaultPriceValue) => {
    setOnEditItem({index: index, loading: false})
    setItemOnEditValues({extraName: defaultNameValue, extraPrice: defaultPriceValue})
  }

  useEffect(() => {
    if (restaurantSelected.length > 0)
      getExtra(clientData.id, restaurantSelected)
  }, [restaurantSelected])

  return (
    <PageContainer>
      {!restaurantSelected ? (
        <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box width='100%' display={'flex'} justifyContent={'center'} fontSize={30} mb={3}>
            ALEGETI RESTAURANTUL
          </Box>
          <>
            {restaurants.map((el) => {
              return (
                <PrimaryButton key={el.id} variant='contained' style={{ marginBottom: 5, width: '50%' }} onClick={() => setRestaurantSelected(el.id)}>
                  {el.restaurantName}
                </PrimaryButton>
              )
            })}
          </>
        </Box>
      ) : (
        <>
          <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
            <Box textAlign='left' width={'100%'} fontSize='35px'>
              <IconButton onClick={() => goBackMenuSelection()} size={'small'} style={{ marginRight: 15 }} >
                <ArrowBack size={14} />
              </IconButton>
              EXTRA
            </Box>
            <Box width={'100%'} flexWrap='wrap'>
                <Box fontSize={20} marginTop={2} marginBottom={2}  >
                    Adauga Extra
                </Box>
                <Grid container spacing={3}>
                    <Grid container item xs={3}>
                        <WaiteroTextField value={newExtraName} onChange={(e)=>setNewExtraName(e.target.value)} placeholder={'Nume'} fullWidth/>
                    </Grid>
                    <Grid container item xs={1}>
                        <WaiteroTextField value={newExtraPrice} onChange={(e)=>setNewExtraPrice(e.target.value)} placeholder={'Pret'} fullWidth/>    
                    </Grid>
                  <Grid container item xs={2}>
                        {loadingOnAdd ? <CircularProgress size={20}/> : <>
                                <IconButton style={{marginRight: 2}} onClick={resetFields}><Close color='error'/></IconButton>
                      <IconButton disabled={ !newExtraName.length || !newExtraPrice.length || numberValidator(newExtraPrice) }
                        onClick={addExtraToList}>
                        <Add color={ !newExtraName.length || !newExtraPrice.length || numberValidator(newExtraPrice) ? 'disabled' : 'action'} />
                      </IconButton>
                            </>
                        }
                    </Grid>
                </Grid>
                <Box fontSize={20} marginTop={2} marginBottom={2}  >
                    Extra adaugati
                </Box>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                    {
                      extra?.map((item, index) => {
                        return (
                            <Grid key={item.id} container spacing={3}>
                                <Grid container item xs={3}>
                                    <WaiteroTextField value={onEditItem.index === index ? itemOnEditValues.extraName : item.extraName} onChange={(e)=>setItemOnEditValues({extraName: e.target.value, extraPrice: itemOnEditValues.extraPrice})} fullWidth disabled={onEditItem.index !== index }/>
                                </Grid>
                                <Grid container item xs={1}>
                                    <WaiteroTextField value={onEditItem.index === index ? itemOnEditValues.extraPrice : item.extraPrice} onChange={(e)=>setItemOnEditValues({extraName: itemOnEditValues.extraName, extraPrice: e.target.value})} fullWidth disabled={onEditItem.index !== index }/>
                                </Grid>
                                <Grid container item xs={2}>
                                    {onEditItem.index === index && onEditItem.loading ? <CircularProgress size={20}/> : <>
                                        {onEditItem.index === index ? (<>
                                            <IconButton style={{marginRight: 2}} onClick={resetExistentExtra}><Close color='error'/></IconButton>
                                            <IconButton onClick={()=>updateExtraFromList(item.id)}><SaveAlt color='action'/></IconButton>
                                        </>) : (<>
                                            <IconButton onClick={()=>clickedEditOnItem(index, item.extraName, item.extraPrice)}><Edit color='action'/></IconButton>
                                            <DeleteModalIcon type={'extra'} clientId={clientData.id} message={'Confirmati stergerea acestui extra?'} restaurantId={restaurantSelected} drinkId={item.id} extraId={item.id}/>
                                        </>)}
                                    </>}
                                </Grid>
                            </Grid>)})
                        }
                </>)}
            </Box>
          </Box>
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  extra: state?.restaurantReducer?.restaurant?.extra,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getExtra: (clientId, restaurantId, loadingSetter) => dispatch(getExtra(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Extra));
