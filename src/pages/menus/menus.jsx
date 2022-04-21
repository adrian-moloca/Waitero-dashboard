import React, { useEffect, useState } from 'react';
import { Box, IconButton, Modal, Paper } from '@material-ui/core';

import PageContainer from '../../components/container/page-container/page-container.jsx';

import { useHistory } from 'react-router-dom';

import MenuCard from '../../components/box/menu-card/menu-card.jsx';

import { RESTAURANT } from './data.js';
import { ArrowBack } from '@material-ui/icons';
import EditMenuItem from '../../components/modal/edit-menu-item.jsx';

const MENU_DATA = RESTAURANT.restaurantMenu;

const Menus = () => { 

  const history = useHistory()
  const [menuType, setMenuType] = useState(-1)
  const [onSection, setOnSection] = useState(-1);
  const [modalIngredientsStatus, setModalIngredientsStatus] = useState(false);
  const [plateSelected, setPlateSelected] = useState(-1);

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
    setModalIngredientsStatus(true);
  }

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
                {menuType < 0 && MENU_DATA.menuTypes.map((item, index) => {
                    return (
                        <Box marginRight={3} onClick={()=>setMenuType(index)}>
                            <MenuCard title={item.menuName}/>
                        </Box>
                    )
                })}
                {menuType >= 0 && onSection < 0 && MENU_DATA.menuTypes[menuType].menuSections.map((item, index) => {
                    return (
                        <Box marginRight={3} onClick={()=>setOnSection(index)}>
                            <MenuCard title={item.sectionName}/>
                        </Box>
                    )
                })}
                {onSection >= 0 && MENU_DATA.menuTypes[menuType].menuSections[onSection].plates.map((item, index) => {
                    return (
                        <Box marginRight={3} onClick={()=>onItemClick(index)}>
                            <MenuCard title={item.plateName}/>
                        </Box>
                    )
                })}
            </Box>
        </Box>
        <EditMenuItem isModalOpen={modalIngredientsStatus} setIsModalOpen={setModalIngredientsStatus} item={MENU_DATA.menuTypes[menuType]?.menuSections[onSection]?.plates[plateSelected]}/>
    </PageContainer>
  )
}

export default Menus;
