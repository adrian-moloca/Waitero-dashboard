import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@material-ui/core';

import PageContainer from '../../components/container/page-container/page-container.jsx';

import { withRouter } from 'react-router-dom';

import MenuCard from '../../components/box/menu-card/menu-card.jsx';

import { RESTAURANT } from './data.js';
import { ArrowBack, Edit } from '@material-ui/icons';
import EditMenuItem from '../../components/modal/edit-menu-item.jsx';
import AddMenuModal from '../../components/modal/add-menu-type.jsx';
import AddContent from '../../components/box/add-content/add-content.jsx';
import AddMenuItem from '../../components/modal/add-menu-item.jsx';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { getCategories, getMenus, getPlates } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';

const MENU_DATA = RESTAURANT.restaurantMenu

const Menus = ({ restaurants, menus, categories, plates, clientData, restaurantReducer, getMenus, getCategories, getPlates, cleanErrorMessage }) => {

  const firstRender = useRef(true);
  const [restaurantSelected, setRestaurantSelected] = useState('');
  const [menuType, setMenuType] = useState('')
  const [onCategory, setOnCategory] = useState('');
  const [plateSelected, setPlateSelected] = useState('');
  const [menuData, setMenuData] = useState(MENU_DATA || {});
  const [modalIngredientsStatus, setModalIngredientsStatus] = useState(false);
  const [modalAddMenuType, setModalAddMenuType] = useState(false);
  const [modalAddMenuItem, setModalAddMenuItem] = useState(false);

  const getTitle = () => {
    if (menuType.length === 0)
      return 'Meniuri'
    else if (onCategory.length === 0)
      return 'Categorii'
    else if (menuType.length > 0 && onCategory.length > 0)
      return 'Preparate'
  }

  const goBackMenuSelection = () => {
    if (onCategory.length > 0) {
      setOnCategory('');
      return;
    } else if (menuType.length > 0 && onCategory.length === 0) {
      setMenuType('')
      return;
    } else if (menuType.length === 0) {
      setRestaurantSelected('')
      return;
    }
  }

  const closeModal = () => {
    setPlateSelected(-1)
  }

  const saveEdits = (item) => {
    const tempPlates = [...menuData.menuTypes[menuType]?.menuSections[onCategory]?.plates]
    const tempSections = [...menuData.menuTypes[menuType]?.menuSections]
    const tempTypes = [...menuData.menuTypes]
    tempPlates.splice(plateSelected, 1, item)
    tempSections.splice(onCategory, 1, { ...menuData.menuTypes[menuType]?.menuSections[onCategory], plates: tempPlates })
    tempTypes.splice(menuType, 1, { ...menuData.menuTypes[menuType], menuSections: tempSections })
    setMenuData({ menuTypes: tempTypes })
  }

  useEffect(() => {
    MENU_DATA ? setMenuData(MENU_DATA) : setMenuData({})
  }, [MENU_DATA])

  useEffect(() => {
    if (firstRender.current)
      firstRender.current = false
    else if (!modalIngredientsStatus)
      setModalIngredientsStatus(true)
    else
      setModalIngredientsStatus(false)
  }, [plateSelected])

  useEffect(() => {
    if (restaurantSelected.length > 0)
      getMenus(clientData.id, restaurantSelected)
  }, [restaurantSelected])

  useEffect(() => {
    if (menuType.length > 0)
      getCategories(clientData.id, restaurantSelected, menuType)
  }, [menuType])

  useEffect(() => {
    if (onCategory.length > 0)
      getPlates(clientData.id, restaurantSelected, menuType, onCategory)
  }, [onCategory])

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
              {getTitle()}
            </Box>
            <Box width={'100%'} display={'flex'} marginTop={'2%'} flexWrap='wrap'>
              {restaurantReducer.loading ? <CircularProgress /> : (<>
                {menuType.length === 0 && (
                  <>
                    {
                      menus?.map((item) => {
                        return (
                          <Box>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'menu'} clientId={clientData.id} message={'Confirmati stergerea acestui meniu?'} restaurantId={restaurantSelected} menuId={item.id}/>
                              <IconButton><Edit /></IconButton>
                            </Box>
                            <Box key={item.id} marginRight={3} marginBottom={3} onClick={() => setMenuType(item.id)}>
                              <MenuCard title={item.menuName} />
                            </Box>
                          </Box>
                        )
                      })}
                      <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuType(true)}>
                      <MenuCard title={<AddContent title={'Adauga meniu'} />} />
                    </Box>
                  </>
                )}
                {menuType.length > 0 && onCategory.length === 0 && (
                  <>
                    {categories?.map((item) => {
                      return (
                        <Box>
                          <Box display={'flex'}>
                            <DeleteModalIcon type={'category'} clientId={clientData.id} message={'Confirmati stergerea acestei categorii?'} restaurantId={restaurantSelected} menuId={menuType} categoryId={item.id}/>
                            <IconButton><Edit /></IconButton>
                          </Box>
                          <Box key={item.id} marginRight={3} marginBottom={3} onClick={() => setOnCategory(item.id)}>
                            <MenuCard title={item.categoryName} />
                          </Box>
                        </Box>
                      )
                    })}
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuType(true)}>
                      <MenuCard title={<AddContent title={'Adauga categorie'} />} />
                    </Box>
                  </>
                )}
                {onCategory.length > 0 && (
                  <>
                    {plates?.map((item) => {
                      return (
                        <Box>
                          <Box display={'flex'}>
                            <DeleteModalIcon  type={'plate'} clientId={clientData.id} message={'Confirmati stergerea acestui preparat?'} restaurantId={restaurantSelected} menuId={menuType} categoryId={onCategory} plateId={item.id}/>
                            <IconButton><Edit /></IconButton>
                          </Box>
                          <Box marginRight={3} marginBottom={3} onClick={() => setPlateSelected(item.id)}>
                            <MenuCard title={item.plateName} />
                        </Box>
                        </Box>
                      )
                    })}
                    <Box marginRight={3} marginTop={6} onClick={() => setModalAddMenuItem(true)}>
                      <MenuCard title={<AddContent title={'Adauga preparat'} />} />
                    </Box>
                  </>
                )}
              </>)}
            </Box>
          </Box>
          <EditMenuItem isModalOpen={modalIngredientsStatus} setIsModalOpen={() => closeModal()} item={plates?.find(el=>el.id===plateSelected)} setItem={(item) => saveEdits(item)} />
          <AddMenuModal isOpen={modalAddMenuType} setIsOpen={() => setModalAddMenuType(false)} clientId={clientData.id} restaurantId={restaurantSelected} menuId={menuType} createMenuType={() => menuType.length > 0 ? getCategories(clientData.id, restaurantSelected, menuType) : getMenus(clientData.id, restaurantSelected)} />
            <AddMenuItem isModalOpen={modalAddMenuItem} setIsModalOpen={() => setModalAddMenuItem(false)} setItem={() => { getPlates(clientData.id, restaurantSelected, menuType, onCategory) }} clientId={clientData.id} restaurantId={restaurantSelected} menuId={menuType} categoryId={onCategory} />
        </>)}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  plates: state?.restaurantReducer?.restaurant?.plates,
  categories: state?.restaurantReducer?.restaurant?.categories,
  menus: state?.restaurantReducer?.restaurant?.menus,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getMenus: (clientId, restaurantId, loadingSetter) => dispatch(getMenus(clientId, restaurantId, loadingSetter)),
  getCategories: (clientId, restaurantId, menuId, loadingSetter) => dispatch(getCategories(clientId, restaurantId, menuId, loadingSetter)),
  getPlates: (clientId, restaurantId, menuId, categoryId, loadingSetter) => dispatch(getPlates(clientId, restaurantId, menuId, categoryId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menus));
