import React from 'react';
import { Box } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { useHistory } from 'react-router-dom';
import AddBoxOverview from '../../components/box/add-box-overview/add-box-overview.js';

const Settings = () => {
  const history = useHistory()

  return (
    <PageContainer>
        <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <Box textAlign='left' width={'100%'}  fontSize='35px'>
                Setari
            </Box>
            <Box display='flex' justifyContent={'flex-start'} width>  
                <Box paddingTop='2%' width={'24%'} marginRight={'2%'}>
                    <AddBoxOverview 
                        overlayText={'Profil'} backgroundColor={'#ffffff'} color={'#00000090'} height={250} width={'100%'} alignItems={'center'} justifyContent={'flex-end'} boxShadow={'0px 6px 6px rgba(0, 0, 0, 0.25)'} iconHome/>
                </Box>
                <Box paddingTop='2%' width={'24%'} marginRight={'2%'}>
                    <AddBoxOverview
                        overlayText={'Account'} backgroundColor={'#ffffff'} color={'#00000090'} height={250} width={'100%'} alignItems={'center'} iconAccount boxShadow={'0px 6px 6px rgba(0, 0, 0, 0.25)'}/>
                </Box>
                <Box paddingTop='2%' width={'24%'} marginRight={'2%'}>
                    <AddBoxOverview
                        overlayText={'Display'} flexDirection={'column'} justifyContent={'space-between'} backgroundColor={'#ffffff'} color={'#00000090'} height={250} width={'100%'} iconDisplay boxShadow={'0px 6px 6px rgba(0, 0, 0, 0.25)'}/>
                </Box>
            </Box>      
        </Box>
    </PageContainer>
  )
}

export default Settings;
