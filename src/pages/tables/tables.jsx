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
import TableCard from '../../components/box/table-card/table-card.jsx';

const Tables = ({ restaurants, tables, clientData, restaurantReducer, getExtra, cleanErrorMessage }) => {

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
              QR MESE
            </Box>
            <Box width={'100%'} display={'flex'} marginTop={'2%'} flexWrap='wrap'>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuType(true)}>
                    <TableCard title={<AddContent title={'Adauga meniu'} />} />
                  </Box>
                    {
                      tables?.map((item) => {
                        return (
                          <Box key={item.id}>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'menu'} clientId={clientData.id} message={'Confirmati stergerea acestui meniu?'} restaurantId={restaurantSelected} menuId={item.id}/>
                              <IconButton onClick={() => /* setModalEditMenuType({name: item.menuName, id: item.id} */)}><Edit /></IconButton>
                            </Box>
                            <Box key={item.id} marginRight={3} marginBottom={3} onClick={() => setMenuType(item.id)}>
                              <TableCard title={item.menuName} />
                            </Box>
                          </Box>
                        )
                      })}
                  </>
                )}
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
  tables: state?.restaurantReducer?.restaurant?.tables,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getExtra: (clientId, restaurantId, loadingSetter) => dispatch(getExtra(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tables));
