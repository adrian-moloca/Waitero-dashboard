import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Modal, Paper } from '@material-ui/core';

import PageContainer from '../../components/container/page-container/page-container.jsx';

import { useHistory, withRouter } from 'react-router-dom';

import MenuCard from '../../components/box/menu-card/menu-card.jsx';

import { RESTAURANT } from './data.js';
import { AddBoxTwoTone, ArrowBack } from '@material-ui/icons';
import EditMenuItem from '../../components/modal/edit-menu-item.jsx';
import AddMenuModal from '../../components/modal/add-menu-type.jsx';
import AddContent from '../../components/box/add-content/add-content.jsx';
import AddMenuItem from '../../components/modal/add-menu-item.jsx';
import { connect } from 'react-redux';
import { makePickerWithState } from '@material-ui/pickers';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';

const MENU_DATA = RESTAURANT.restaurantMenu

const Menus = ({restaurants}) => { 

  const history = useHistory(); 
  const firstRender = useRef(true);
  const [restaurantSelected, setRestaurantSelected] = useState('');
  const [menuType, setMenuType] = useState(-1)
  const [onSection, setOnSection] = useState(-1);
  const [plateSelected, setPlateSelected] = useState(-1);
  const [menuData, setMenuData] = useState(MENU_DATA || {});
  const [modalIngredientsStatus, setModalIngredientsStatus] = useState(false);
  const [modalAddMenuType, setModalAddMenuType] = useState(false);
  const [modalAddMenuItem, setModalAddMenuItem] = useState(false);

  const goBackMenuSelection = () => {
    if (onSection >= 0){
      setOnSection(-1);
      return;
    } else if (menuType >= 0 && onSection < 0){
      setMenuType(-1)
      return;
    } else if(menuType < 0){
      setRestaurantSelected('')
      return;
    }
  }

  const onItemClick = (index) => {
    setPlateSelected(index);
  }

  const closeModal = () => {
    setPlateSelected(-1)
  }

  const addMenuType = (type, onSectionAdd) => {
    if (onSectionAdd < 0) {
      const tempTypes = [...menuData.menuTypes]
      tempTypes.push({ menuName: type, menuId: new Date().toString(), menuSections: [] })
      setMenuData({ menuTypes: tempTypes })
    } else if (onSectionAdd) {
      const tempTypes = [...menuData.menuTypes]
      const tempSections = [...menuData.menuTypes[menuType]?.menuSections]
      tempSections.push({ sectionName: type, sectionId: new Date().toString(), plates: [] })
      tempTypes.splice(menuType, 1, {...menuData.menuTypes[menuType], menuSections: tempSections})
      setMenuData({ menuTypes: tempTypes })  
    }
    setModalAddMenuType(false);
  }

  const saveEdits = (item) => {
    const tempPlates = [...menuData.menuTypes[menuType]?.menuSections[onSection]?.plates]
    const tempSections = [...menuData.menuTypes[menuType]?.menuSections]
    const tempTypes = [...menuData.menuTypes]
    tempPlates.splice(plateSelected, 1, item)
    tempSections.splice(onSection, 1, {...menuData.menuTypes[menuType]?.menuSections[onSection], plates: tempPlates})
    tempTypes.splice(menuType, 1, {...menuData.menuTypes[menuType], menuSections: tempSections})
    setMenuData({ menuTypes: tempTypes })
  }

  const saveEditsAddMenuItem = (item) => {
    const tempPlates = [...menuData.menuTypes[menuType]?.menuSections[onSection]?.plates]
    const tempSections = [...menuData.menuTypes[menuType]?.menuSections]
    const tempTypes = [...menuData.menuTypes]
    tempPlates.push(item);
    tempSections.splice(onSection, 1, {...menuData.menuTypes[menuType]?.menuSections[onSection], plates: tempPlates})
    tempTypes.splice(menuType, 1, {...menuData.menuTypes[menuType], menuSections: tempSections})
    setMenuData({ menuTypes: tempTypes })
  }

  useEffect(() => {
    MENU_DATA ? setMenuData(MENU_DATA) : setMenuData({})
  }, [MENU_DATA])

  useEffect(() => {
    if(firstRender.current)  
      firstRender.current = false
    else if (!modalIngredientsStatus)
      setModalIngredientsStatus(true)
    else
      setModalIngredientsStatus(false)
  }, [plateSelected])

  return (
    <PageContainer>
      { !restaurantSelected ? (
              <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'}>
                  <Box width='100%' display={'flex'} justifyContent={'center'} fontSize={30} mb={3}>
                    ALEGETI RESTAURANTUL
                  </Box>
                  <>
                  {restaurants.map((el)=>{
                    return (
                      
                      <PrimaryButton variant='contained' style={{marginBottom: 5, width: '50%'}} onClick={()=>setRestaurantSelected(el.id)}>
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
                Meniuri
            </Box>
        <Box width={'100%'} display={'flex'} marginTop={'2%'}>
          {menuType < 0 && (
            <>
              {
                menuData.menuTypes?.map((item, index) => {
                  return (
                      <Box marginRight={3} onClick={()=>setMenuType(index)}>
                          <MenuCard title={item.menuName}/>
                      </Box>        
                  )
              })}
              <Box marginRight={3} onClick={()=>setModalAddMenuType(true)}>
                <MenuCard title={<AddContent title={'Adauga meniu'}/>}/>
              </Box>        
            </>
          )}
          {menuType >= 0 && onSection < 0 && (
            <>
            {menuData?.menuTypes[menuType]?.menuSections?.map((item, index) => {
                        return (
                            <Box marginRight={3} onClick={()=>setOnSection(index)}>
                                <MenuCard title={item.sectionName}/>
                            </Box>
                        )
            })}
            <Box marginRight={3} onClick={()=>setModalAddMenuType(true)}>
              <MenuCard title={<AddContent title={'Adauga sectiune'}/>}/>
            </Box>
          </>
          )}
          {onSection >= 0 && (
            <>
            { menuData?.menuTypes[menuType]?.menuSections[onSection]?.plates.map((item, index) => {
              return (
                  <Box marginRight={3} onClick={()=>onItemClick(index)}>
                      <MenuCard title={item.plateName}/>
                  </Box>
              )
            })}
            <Box marginRight={3} onClick={()=>setModalAddMenuItem(true)}>
              <MenuCard title={<AddContent title={'Adauga farfurie'}/>}/>
            </Box>
          </>
          )}
        </Box>
      </Box>
      <EditMenuItem isModalOpen={modalIngredientsStatus} setIsModalOpen={() => closeModal()} item={menuData?.menuTypes[menuType]?.menuSections[onSection]?.plates[plateSelected]} setItem={(item) => saveEdits(item)} />
      <AddMenuModal isOpen={modalAddMenuType} setIsOpen={() => setModalAddMenuType(false)} createMenuType={(name) => addMenuType(name, menuType)} />
      <AddMenuItem isModalOpen={modalAddMenuItem} setIsModalOpen={() => setModalAddMenuItem(false)} setItem={(newItem) => { saveEditsAddMenuItem(newItem);  console.log(newItem)} }/>
      </> ) }
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({restaurants: state?.clientReducer?.client?.restaurants})

export default withRouter(connect(mapStateToProps, null)(Menus));
