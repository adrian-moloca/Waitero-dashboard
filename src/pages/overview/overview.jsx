import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import BoxWithShadow from '../../components/box/box-with-shadow/box-with-shadow.jsx';
import { Redirect, useHistory } from 'react-router-dom';
import EditLabelModal from '../../components/modal/edit-label-modal.jsx';
import { Facebook, Forum, Instagram, Language, Money, Phone, RestaurantMenu, Room, Schedule } from '@material-ui/icons';
import EditStringArrayModal from '../../components/modal/edit-string-array-modal.jsx';
import AddBoxOverview from '../../components/box/add-box-overview/add-box-overview.jsx';
import GeneralStatisticsBox from '../../components/box/general-statistics-box/general-statistics-box.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import WaiteroSelect from '../../components/select/waitero-select.jsx';
import DeleteModal from '../../components/modal/delete-modal.jsx';
import { getPlateMinimumPrice, getRestaurants, updateRestaurantField } from '../../api/api-client/client-requests.js';
import { useRef } from 'react';
import WaiteroAlert from '../../components/alert/alert.jsx';
import { getBase64Image } from '../../utils/functions/base64Image.js';
import EditAddressModal from '../../components/modal/edit-address-modal.jsx';
import EditContactModal from '../../components/modal/edit-contact-modal.jsx';

const Overview = ({ restaurants, clientData, getRestaurants }) => { 

  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants.length > 0 ? restaurants[0]?.id : '')
  const [coverPhoto, setCoverPhoto] = useState(restaurants.length > 0 ? restaurants[0]?.coverPicture : '');
  const [photoChanged, setPhotoChanged] = useState(false);
  const [restaurantName, setRestaurantName] = useState(restaurants.length > 0 ? restaurants[0]?.restaurantName : '');
  const [restaurantAddress, setRestaurantAddress] = useState(restaurants.length > 0 ? restaurants[0]?.location?.address : '');  
  const [showEditResAddress, setShowEditResAddress] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [showEditCusines, setShowEditCusines] = useState(false);
  const [resDescription, setResDescription] = useState(restaurants.length > 0 ?  restaurants[0]?.description : '')
  const [cusines, setCusines] = useState(restaurants.length > 0 ? restaurants[0]?.cuisines : '')
  const [error, setError] = useState({message: '', isError: false});
  const [restaurantContact, setRestaurantContact] = useState(restaurants.length > 0 ? restaurants[0]?.contact : '')
  const [plateMinimumPrice, setPlateMinimumPrice] = useState(0);
  const [loadingMinPrice, setLoadMinPrice] = useState(false);
  const history = useHistory()
  const firstRender = useRef(true)

  const createCoverPhoto= async (photo)=>{
    const base64 = await getBase64Image(photo)
    setPhotoChanged(true);
    setCoverPhoto(base64)
  }

  useEffect(() => {
    getPlateMinimumPrice(clientData.id, selectedRestaurant, setPlateMinimumPrice, setLoadMinPrice, setError)
  }, [])

  useEffect(() => {
    setRestaurantName(restaurants.find(el => el.id === selectedRestaurant)?.restaurantName)
    setResDescription(restaurants.find(el => el.id === selectedRestaurant)?.description)
    setCusines(restaurants.find(el => el.id === selectedRestaurant)?.cuisines)
    setCoverPhoto(restaurants.find(el => el.id === selectedRestaurant)?.coverPicture)
  }, [selectedRestaurant])

  useEffect(()=>{
    if(!restaurants.find(el=> el.id === selectedRestaurant))
      setSelectedRestaurant(restaurants[0]?.id)
  }, [restaurants])

  const handleChangeRestaurant = (e) => {
    setSelectedRestaurant(e.target.value)
  }

  useEffect(()=>{
    getRestaurants(clientData.id, ()=>undefined)
  },[restaurantName, resDescription, cusines, coverPhoto])

  useEffect(()=>{
    if(firstRender.current )
      firstRender.current = false
    else if(coverPhoto.length > 0 && !(firstRender.current) && photoChanged){
      updateRestaurantField({ coverPicture: coverPhoto }, clientData.id, selectedRestaurant, setCoverPhoto, () => undefined, setError)
      setPhotoChanged(false)
    }
  }, [coverPhoto])

  return (
    <PageContainer>
      <WaiteroAlert isError={error.isError} message={error.message} cleanError={() => setError({message: '', isError: false})} />
      {restaurants.length > 0 ? (
      <Box display='flex' width={'90%'} flexDirection={'row'} alignItems={'flex-start'} justifyContent={'flex-start'}>
        <Box width='32%' display='flex' flexDirection='column' justifyContent='center'>
          <Box display={'flex'} width={'100%'}>
          <WaiteroSelect  value={selectedRestaurant} fullWidth onChange={ handleChangeRestaurant } style={{fontSize: 25}}>
            {restaurants.map((restaurant, index) => {
              return (
                <MenuItem key={restaurant.id + index} value={ restaurant.id }>
                  { restaurant?.restaurantName }
                </MenuItem>
              )
            } ) }
          </WaiteroSelect>
          <EditLabelModal labelName={'restaurantName'} label={restaurantName} setLabel={(label) => setRestaurantName(label)} clientId={clientData.id} restaurantId={selectedRestaurant} />
          </Box>
          <Box paddingTop='8%'>
              <BoxWithShadow name = {'cover-photo'} source={coverPhoto} setSource={ createCoverPhoto }
                  overlayText={'EDITEAZA COPERTA'} height={250} width={'92%'} isButton />
              <Box onMouseEnter={() => setShowEditResAddress(true)} onMouseLeave={() => setShowEditResAddress(false)}
                  style={{ fontSize: 25, fontWeight: '-moz-initial', paddingTop: '20px', width: 426, fontStyle: 'oblique' }}><Room size={25} color={'inherit'} style={{marginRight: 3}}/>
                  {restaurantAddress?.street ? restaurantAddress?.street+' '+restaurantAddress?.number+', ' : ''}{restaurantAddress?.city ? restaurantAddress?.city+', ' : ''}{restaurantAddress?.country}
                  <Box>{restaurantAddress?.postalCode}{showEditResAddress && <EditAddressModal addressObject={restaurantAddress} setAddressObject={(obj) => setRestaurantAddress(obj)} clientId={clientData.id} restaurantId={selectedRestaurant} />}</Box>
                  </Box>
          </Box>
          <Box>
          <Box width={'92%'}  display={'flex'} justifyContent={'flex-end'}> <Rating readOnly defaultValue={0} precision={0.1} size='large'/></Box>
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <Forum size={20} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>0 recenzii</Box></Box>    
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <Money size={20} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{loadingMinPrice ? <CircularProgress size={16}/> : plateMinimumPrice} RON pret minim</Box></Box>      
          <Box width={'92%'} display={'flex'} fontSize={20} flexDirection={'row'}> <RestaurantMenu size={20} color={'inherit'} style={{ paddingRight: 20 }} /><Box onMouseEnter={() => setShowEditCusines(true)} onMouseLeave={() => setShowEditCusines(false)}>{cusines.length ? cusines.join(', ') : ''}{showEditCusines ? <EditStringArrayModal labelName={'cuisines'} array={cusines} setArray={(cuisines) => setCusines(cuisines) }  clientId={clientData.id} restaurantId={selectedRestaurant}/> : null}</Box></Box>      
        </Box>
        <Box width={'92%'} display={'flex'} fontSize={19} marginTop={2} onMouseEnter={ () => setShowEditDescription(true) } onMouseLeave={()=>setShowEditDescription(false)}>
          { resDescription }
          { showEditDescription ? <EditLabelModal labelName={'description'} label ={resDescription} setLabel={(label) => setResDescription(label)}  clientId={clientData.id} restaurantId={selectedRestaurant} /> : null}
        </Box>
        <Box width={'92%'} display={'flex'} fontSize={19} marginTop={2} onMouseEnter={ () => setShowEditDescription(true) } onMouseLeave={()=>setShowEditDescription(false)}>
          <DeleteModal label={'Sterge restaurantul'} message={'Confirmati stergerea acestui restaurant?'} clientId={clientData.id} restaurantId={selectedRestaurant}/>
        </Box>
        </Box>
       <Box width={'63%'} display={'flex'} flexDirection={'column'} alignItems='center'> 
      <Box width='100%' marginTop={'8%'} display='flex' flexDirection='row' justifyContent='space-between' marginBottom={4}>
          <Box paddingTop='2%' width={'48%'}>
              <AddBoxOverview onClick={()=>history.push('/menus')}
                  overlayText={'Adauga meniu'} backgroundColor={'#00000099'} height={250} width={'100%'} alignItems={'center'} justifyContent={'flex-end'} iconAdd/>
          </Box>
          <Box paddingTop='2%' width={'48%'}>
            <Box height={250} width={'100%'} onMouseEnter={ () => setShowEditContact(true) } onMouseLeave={()=>setShowEditContact(false)}>
              <Box fontSize={22} paddingTop={1}>Informati contact</Box>
              <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Phone size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.phoneNumber}</Box></Box>    
              <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Language size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.website}</Box></Box>    
              <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Schedule size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>Lun-Vin {restaurantContact?.orar?.mondayToFriday?.openAt}-{restaurantContact?.orar?.mondayToFriday?.closeAt} | Sam {restaurantContact?.orar?.saturday?.openAt}-{restaurantContact?.orar?.saturday?.closeAt} | Dum {restaurantContact?.orar?.sunday?.openAt}-{restaurantContact?.orar?.sunday?.closeAt} </Box></Box>    
              <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Facebook size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.socialMedia?.facebookLink}</Box></Box>    
              <Box width={'92%'} display={'flex'} fontSize={22} flexDirection={'row'} paddingTop={1}> <Instagram size={21} color={'inherit'} style={{ paddingRight: 20 }} /> <Box>{restaurantContact?.socialMedia?.instagramLink}</Box></Box>
              {showEditContact && <EditContactModal/>}    
            </Box>
          </Box>
          </Box>
          <Box height={200} width={'100%'} marginTop={4}>
            <Grid container justifyContent='space-between' width='100%'>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Mancare'} content={0} subInfo={ <Rating readOnly defaultValue={0} precision={0.1} size='small' /> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Servire'} content={0} subInfo={ <Rating readOnly defaultValue={0} precision={0.1} size='small' /> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Locul'} content={0} subInfo={ <Rating readOnly defaultValue={0} precision={0.1} size='small'/> } rating/>
              </Grid>
              <Grid container item xs={3} justifyContent={'center'}>
                <GeneralStatisticsBox title={'Experienta'} content={0} subInfo={ <Rating readOnly defaultValue={0} precision={0.1} size='small'/> } rating/>
              </Grid>
            </Grid>
          </Box>
      </Box>
          
        </Box>
    ) : <Redirect to='on-boarding'/>}
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
  restaurants: state?.clientReducer?.client?.restaurants || [],
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getRestaurants: (clientId, loadingSetter) => dispatch(getRestaurants(clientId, loadingSetter))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
