import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import MenuCard from '../../components/box/menu-card/menu-card.jsx';
import { ArrowBack } from '@material-ui/icons';
import AddDrinkModal from '../../components/modal/add-drink-modal.jsx';
import AddContent from '../../components/box/add-content/add-content.jsx';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { getDrinks } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import EditDrinkModal from '../../components/modal/edit-drink-modal.jsx';

const Drinks = ({ restaurants, drinks, clientData, restaurantReducer, getDrinks, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState('');
  const [drinkSelected, setDrinkSelected] = useState('')
  const [modalAddDrinkType, setModalAddDrinkType] = useState(false); 

  const goBackMenuSelection = () => {
    setRestaurantSelected('')
  }

  const drinkCardText = (name, category) => {
    return(
        <Box>
            <Box>{name}</Box>
            <Box>{category}</Box>
        </Box>
    )
  }

  useEffect(() => {
    if (restaurantSelected.length > 0)
      getDrinks(clientData.id, restaurantSelected)
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
              BAUTURI
            </Box>
            <Box width={'100%'} display={'flex'} marginTop={'2%'} flexWrap='wrap'>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                    {
                      drinks?.map((item) => {
                        return (
                          <Box>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'drink'} clientId={clientData.id} message={'Confirmati stergerea acestei bauturi?'} restaurantId={restaurantSelected} drinkId={item.id}/>
                            </Box>
                            <Box key={item.id} marginRight={3} marginBottom={3} onClick={() => setDrinkSelected(item.id)}>
                              <MenuCard title={drinkCardText(item.drinkName, item.drinkCategory)} />
                            </Box>
                          </Box>
                        )
                      })}
                      <Box marginRight={3} marginTop={6} onClick={() => setModalAddDrinkType(true)}>
                      <MenuCard title={<AddContent title={'Adauga bautura'} />} />
                    </Box>
                  </>
                )}
            </Box>
          </Box>
          <AddDrinkModal isOpen={modalAddDrinkType} setIsOpen={() => setModalAddDrinkType(false)} clientId={clientData.id} restaurantId={restaurantSelected} createDrinkType={() => getDrinks(clientData.id, restaurantSelected)} />
          <EditDrinkModal isOpen={drinkSelected.length > 0} setIsOpen={() => setDrinkSelected('')} item={drinks?.find(el=>el.id===drinkSelected)} clientId={clientData.id} restaurantId={restaurantSelected} drinkId={drinkSelected} updateDrinkType={() => getDrinks(clientData.id, restaurantSelected)} />
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  drinks: state?.restaurantReducer?.restaurant?.drinks,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getDrinks: (clientId, restaurantId, loadingSetter) => dispatch(getDrinks(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drinks));
