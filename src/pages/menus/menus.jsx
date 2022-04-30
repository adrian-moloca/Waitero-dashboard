import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Modal, Paper } from '@material-ui/core';

import PageContainer from '../../components/container/page-container/page-container.jsx';

import { useHistory } from 'react-router-dom';

import MenuCard from '../../components/box/menu-card/menu-card.jsx';

import { RESTAURANT } from './data.js';
import { AddBoxTwoTone, ArrowBack } from '@material-ui/icons';
import EditMenuItem from '../../components/modal/edit-menu-item.jsx';
import AddMenuModal from '../../components/modal/add-menu-type.jsx';

const MENU_DATA = RESTAURANT.restaurantMenu

const Menus = () => { 

  const history = useHistory(); 
  const firstRender = useRef(true);
  const [menuType, setMenuType] = useState(-1)
  const [onSection, setOnSection] = useState(-1);
  const [plateSelected, setPlateSelected] = useState(-1);
  const [menuData, setMenuData] = useState(MENU_DATA || {});
  const [modalIngredientsStatus, setModalIngredientsStatus] = useState(false);
  const [modalAddMenuType, setModalAddMenuType] = useState(false);

  const goBackMenuSelection = () => {
    if (onSection >= 0){
      setOnSection(-1);
      return;
    }
    if (menuType >= 0 && onSection < 0){
      setMenuType(-1)
      return;
    }
  }

  const onItemClick = (index) => {
    setPlateSelected(index);
  }

  const closeModal = () => {
    setPlateSelected(-1)
  }

  const addMenuType = (type) => {
    const tempTypes = [...menuData.menuTypes]
    tempTypes.push({menuName: type})
    setMenuData({ menuTypes: tempTypes, menuId: new Date().toString(), menuSections: [] })
    setModalAddMenuType(false);
  }

  const saveEdits = (item) => {
    const tempPlates = [...menuData.menuTypes[menuType].menuSections[onSection].plates]
    const tempSections = [...menuData.menuTypes[menuType].menuSections]
    const tempTypes = [...menuData.menuTypes]
    tempPlates.splice(plateSelected, 1, item)
    tempSections.splice(onSection, 1, {...menuData.menuTypes[menuType].menuSections[onSection], plates: tempPlates})
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
      <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Box textAlign='left' width={'100%'} fontSize='35px'>
          <IconButton onClick={() => goBackMenuSelection()} size={'small'} style={{ marginRight: 15 }} disabled={menuType < 0 && onSection < 0}>
              <ArrowBack size={14} />
            </IconButton>
                Meniuri
            </Box>
        <Box width={'100%'} display={'flex'} marginTop={'2%'}>
          {menuType < 0 && (
            <>
              {
                menuData.menuTypes.map((item, index) => {
                  return (
                      <Box marginRight={3} onClick={()=>setMenuType(index)}>
                          <MenuCard title={item.menuName}/>
                      </Box>        
                  )
              })}
              <Box marginRight={3} onClick={()=>setModalAddMenuType(true)}>
                <MenuCard title={<AddBoxTwoTone style={{fontSize: '50px'}}/>}/>
              </Box>        
            </>
          )}
          {menuType >= 0 && onSection < 0 && menuData.menuTypes[menuType].menuSections.map((item, index) => {
              return (
                  <Box marginRight={3} onClick={()=>setOnSection(index)}>
                      <MenuCard title={item.sectionName}/>
                  </Box>
              )
          })}
          {onSection >= 0 && menuData.menuTypes[menuType].menuSections[onSection].plates.map((item, index) => {
              return (
                  <Box marginRight={3} onClick={()=>onItemClick(index)}>
                      <MenuCard title={item.plateName}/>
                  </Box>
              )
          })}
        </Box>
      </Box>
      <EditMenuItem isModalOpen={modalIngredientsStatus} setIsModalOpen={() => closeModal()} item={menuData.menuTypes[menuType]?.menuSections[onSection]?.plates[plateSelected]} setItem={(item) => saveEdits(item)} />
      <AddMenuModal isOpen={modalAddMenuType} setIsOpen={() => setModalAddMenuType(false)} createMenuType={(name)=>addMenuType(name)}/>
    </PageContainer>
  )
}

export default Menus;
