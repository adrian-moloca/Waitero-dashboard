import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import { AddCircleTwoTone, ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { getCheckouts, getTables } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import AddTableModal from '../../components/modal/add-table-modal.jsx';
import { saveAs } from 'file-saver';
import { dataURLtoFile } from '../../utils/functions/base64Image.js';
import TableCardCheckout from '../../components/box/table-card-checkout/table-card-checkout.jsx';

const Checkout = ({ restaurants, checkouts, clientData, restaurantReducer, getCheckouts, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : ''); 

  const [error, setError] = useState({ message: '', isError: false });
  const [onAddItem, setOnAddItem] = useState(false);

  const goBackMenuSelection = () => {
    setRestaurantSelected('')
  }

  const downloadCode = async (base64, table) => {
    const file = await dataURLtoFile(base64, 'qrcode'+table.toString())
    saveAs(file)
  }

  useEffect(() => {
    if (restaurantSelected?.length > 0)
      getCheckouts(clientData?._id, restaurantSelected)
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
                <PrimaryButton key={el?._id} variant='contained' style={{ marginBottom: 5, width: '50%' }} onClick={() => setRestaurantSelected(el?._id)}>
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
              CHECKOUT
            </Box>
            <Box width={'100%'} display={'flex'} marginTop={'2%'} alignItems={'center'} flexWrap='wrap'>
                {restaurantReducer.loading ? <CircularProgress /> :
                  checkouts && Object.keys(checkouts)?.map((key) => {
                      return (
                            <TableCardCheckout key={key} title={key} arr={checkouts[key]} />
                      )})}
            </Box>
          </Box>
        </>)}
      <AddTableModal isOpen={onAddItem} setIsOpen={setOnAddItem} clientId={clientData?._id} restaurantId={restaurantSelected} tableAdded={()=>getTables(clientData?._id, restaurantSelected) } />
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({ message: '', isError: false })} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  checkouts: state?.restaurantReducer?.restaurant?.checkouts,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getCheckouts: (clientId, restaurantId, loadingSetter) => dispatch(getCheckouts(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
