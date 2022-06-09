import React, { useEffect, useState } from 'react';
import { Box, Grid, MenuItem } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import BoxWithShadow from '../../components/box/box-with-shadow/box-with-shadow.jsx';
import { useHistory } from 'react-router-dom';
import EditLabelModal from '../../components/modal/edit-label-modal.jsx';
import { Forum, Money, RestaurantMenu } from '@material-ui/icons';
import EditStringArrayModal from '../../components/modal/edit-string-array-modal.jsx';
import AddBoxOverview from '../../components/box/add-box-overview/add-box-overview.js';
import GeneralStatisticsBox from '../../components/box/general-statistics-box/general-statistics-box.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import WaiteroSelect from '../../components/select/waitero-select.jsx';


const Overview = ({ restaurants, clientData }) => { 

  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]?.id)
  const [coverPhoto, setCoverPhoto] = useState(restaurants[0]?.coverPicture);
  const [menuPhoto, setMenuPhoto] = useState('https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
  const [restaurantName, setRestaurantName] = useState(restaurants.find(el=> el.id === selectedRestaurant).restaurantName);  
  const [showEditResName, setShowEditResName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditCusines, setShowEditCusines] = useState(false);
  const [resDescription, setResDescription] = useState(restaurants[0].description)
  const [cusines, setCusines] = useState(restaurants[0].cuisines)
  const history = useHistory()

  useEffect(() => {
    setRestaurantName(restaurants.find(el=> el.id === selectedRestaurant).restaurantName)
  }, [selectedRestaurant])

  const handleChangeRestaurant = (e) => {
    setSelectedRestaurant(e.target.value)
  } 

  return (
    <PageContainer>
      <Box display='flex' width={'90%'} flexDirection={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Box width='32%' display='flex' flexDirection='column' justifyContent='center'>
          <WaiteroSelect value={selectedRestaurant} onChange={ handleChangeRestaurant } style={{fontSize: 35}}>
            {restaurants.map((restaurant, index) => {
              return (
                <MenuItem key={restaurant.id + index} value={ restaurant.id }>
                  { restaurant.restaurantName }
                </MenuItem>
              )
            } ) }
          </WaiteroSelect>
          <Box paddingTop='8%'>
              <BoxWithShadow source={coverPhoto} setSource={ setCoverPhoto }
                  overlayText={'EDITEAZA COPERTA'} height={250} width={'92%'} isButton />
              <Box onMouseEnter={() => setShowEditResName(true)} onMouseLeave={() => setShowEditResName(false)}
              style={{ fontSize: 35, fontWeight: '-moz-initial', paddingTop: '20px', width: 426, fontStyle: 'oblique' }}>{restaurantName}{showEditResName ? <EditLabelModal labelName={'restaurantName'} label={restaurantName} setLabel={(label) => setRestaurantName(label)} clientId={clientData.id} restaurantId={selectedRestaurant} /> : null}</Box>
          </Box>
          <Box>
          <Box width={'92%'}  display={'flex'} justifyContent={'flex-end'}> <Rating readOnly defaultValue={4.3} precision={0.1} size='large'/></Box>
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <Forum size={20} color={'#000'} style={{ paddingRight: 20 }} /> <Box>233 recenzii</Box></Box>    
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <Money size={20} color={'#000'} style={{ paddingRight: 20 }} /> <Box>20 RON pret minim</Box></Box>      
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <RestaurantMenu size={20} color={'#000'} style={{ paddingRight: 20 }} /><Box onMouseEnter={() => setShowEditCusines(true)} onMouseLeave={() => setShowEditCusines(false)}>{cusines.length ? cusines.join(', ') : ''}{showEditCusines ? <EditStringArrayModal labelName={'cuisines'} array={cusines} setArray={(cuisines) => setCusines(cuisines) }  clientId={clientData.id} restaurantId={selectedRestaurant}/> : null}</Box></Box>      
        </Box>
        <Box width={'92%'} display={'flex'} fontSize={19} marginTop={2} onMouseEnter={ () => setShowEditDescription(true) } onMouseLeave={()=>setShowEditDescription(false)}>
          { resDescription }
          { showEditDescription ? <EditLabelModal labelName={'description'} label ={resDescription} setLabel={(label) => setResDescription(label)}  clientId={clientData.id} restaurantId={selectedRestaurant} /> : null}
        </Box>
        </Box>
       <Box width={'63%'} display={'flex'} flexDirection={'column'} alignItems='center'> 
      <Box width='100%' marginTop={'8%'} display='flex' flexDirection='row' justifyContent='space-between' marginBottom={4}>
          <Box paddingTop='2%' width={'48%'}>
              <AddBoxOverview onClick={()=>history.push('/menus')}
                  overlayText={'Adauga meniu'} backgroundColor={'#00000099'} height={250} width={'100%'} alignItems={'center'} justifyContent={'flex-end'} iconAdd/>
          </Box>
          <Box paddingTop='2%' width={'48%'}>
            <AddBoxOverview onClick={()=>history.push('/work-staff')}
              overlayText={'Tabel personal'} flexDirection={'column'} justifyContent={'space-between'} backgroundColor={'#000000'} height={250} width={'100%'} iconList/>
          </Box>
          </Box>
          <BoxWithShadow source={menuPhoto} setSource={ setMenuPhoto }
            overlayText={'ADAUGA POZE'} height={250} width={'100%'} justifyContent={'flex-end'} isButton />
          <Box height={200} width={'100%'} marginTop={4}>
            <Grid container justifyContent='space-between' width='100%'>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Mancare'} content={4} subInfo={ <Rating readOnly defaultValue={4} precision={0.1} size='small' /> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Servire'} content={5} subInfo={ <Rating readOnly defaultValue={5} precision={0.1} size='small' /> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Locul'} content={4.5} subInfo={ <Rating readOnly defaultValue={4.5} precision={0.1} size='small'/> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Experienta'} content={4.5} subInfo={ <Rating readOnly defaultValue={4.5} precision={0.1} size='small'/> } rating/>
              </Grid>
            </Grid>
          </Box>
      </Box>
          
        </Box>
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

export default withRouter(connect(mapStateToProps, null)(Overview));
