import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Grid } from '@material-ui/core';
import PageContainer from '../../components/container/page-container/page-container.jsx';
import { withRouter } from 'react-router-dom';
import { Add, AddCircleTwoTone, ArrowBack, Close, Edit, SaveAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/buttons/primaryButton/primaryButton.jsx';
import { addExtra, getExtra, getTables, updateExtra } from '../../api/api-client/client-requests.js';
import { cleanErrorMessageRestaurant } from '../../redux/types/RestaurantTypes.js';
import WaiteroAlert from '../../components/alert/alert.jsx';
import DeleteModalIcon from '../../components/modal/delete-modal-icon.jsx';
import WaiteroTextField from '../../components/text-field/waitero-text-field.jsx';
import TableCard from '../../components/box/table-card/table-card.jsx';
import AddTableModal from '../../components/modal/add-table-modal.jsx';
import FileSaver, { saveAs } from 'file-saver';
import { dataURLtoFile } from '../../utils/functions/base64Image.js';

const Tables = ({ restaurants, tables, clientData, restaurantReducer, getTables, cleanErrorMessage }) => {

  const [restaurantSelected, setRestaurantSelected] = useState(''); 

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
    if (restaurantSelected.length > 0)
      getTables(clientData.id, restaurantSelected)
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
            <Box width={'100%'} display={'flex'} marginTop={'2%'} alignItems={'center'} flexWrap='wrap'>
                {restaurantReducer.loading ? <CircularProgress /> : (<>
                  <Box marginRight={5} marginTop={6}>
                    <IconButton size={"large"}  onClick={() => setOnAddItem(true)}> <AddCircleTwoTone  style={{fontSize: '100px'}}/></IconButton>
                  </Box>
                  {tables?.map((item) => {
                      return (
                          <Box key={item.id}>
                            <Box display={'flex'}>
                              <DeleteModalIcon type={'table'} clientId={clientData.id} message={'Confirmati stergerea acestei mese?'} restaurantId={restaurantSelected} tableId={item.id}/>
                             </Box>
                            <Box key={item.id} marginRight={4} marginBottom={3} onClick={() => downloadCode(item.qrCode, item.tableNumber)}>
                            <TableCard title={item.tableNumber} qrcode={item.qrCode} />
                            </Box>
                        </Box>
                      )})}
                  </>
                )}
            </Box>
          </Box>
        </>)}
      <AddTableModal isOpen={onAddItem} setIsOpen={setOnAddItem} clientId={clientData.id} restaurantId={restaurantSelected} tableAdded={()=>getTables(clientData.id, restaurantSelected) } />
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
  getTables: (clientId, restaurantId, loadingSetter) => dispatch(getTables(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tables));
