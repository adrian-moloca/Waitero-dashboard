import React,{ useState } from "react";
import { Box } from "@material-ui/core";
import PageContainer from "../../components/container/page-container/page-container.jsx";
import { useEffect } from "react";
import useStyles from "./ordersStyle.jsx";
import Order from "../../components/box/order-card/order-card.jsx";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.jsx";
import useInterval from "../../utils/functions/useInterval.js";
import { cleanErrorMessageRestaurant } from "../../redux/types/RestaurantTypes.js";
import { getOrders } from "../../api/api-client/client-requests.js";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import WaiteroAlert from "../../components/alert/alert.jsx";

const Orders = ({ restaurants, ordersRed, clientData, restaurantReducer, getOrders, cleanErrorMessage }) => {

  const classes = useStyles();

  const [restaurantSelected, setRestaurantSelected] = useState(restaurants?.length ? restaurants[0]._id : '');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({arr: ordersRed || []})
  const [ordersCooked, setOrdersCooked] =useState({arr: []})

  const removeOrder = (index) => {  
    const tempCooked = [...ordersCooked.arr]
    const tempOrd = [...orders.arr]
    const el = tempOrd.splice(index, 1)
    if(tempCooked.length > 10)
      tempCooked.shift();
    tempCooked.push(el[0])
    setOrders({arr: [...tempOrd]})
    setOrdersCooked({arr: [...tempCooked]})

  }
 
  /* const getOrdersStart = () => {
    const neworders = [
      {
        _id: Math.floor(Math. random() * 100).toString() + Date.now(),
        tableNumber: (Math.random() * 100).toFixed(2) ,
        timer: 0
      }
    ]
    const temp = [...orders.arr]
    neworders.map(el=> temp.push(el))
    return setOrders({arr: [...temp] })
  } */

  useEffect(()=>{
    if(restaurantSelected.length > 0)
      getOrders(clientData._id, restaurantSelected, setLoading);
  }, [restaurantSelected])

  useEffect(()=>{
    setOrders({arr: ordersRed || []})
  }, [ordersRed])

  /* useInterval(getOrdersStart, 20000) */

  return (
    <PageContainer>
      {!restaurantSelected ? (
        <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box width='100%' display={'flex'} justifyContent={'center'} fontSize={30} mb={3}>
            ALEGETI RESTAURANTUL
          </Box>
          <>
            {restaurants?.map((el) => {
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
                Comenzi
              </Box>
            </Box>
            {restaurantReducer.loading ? <CircularProgress/> : <>
            <Box className={classes.container}>
                {orders.arr?.map((order, index, array)=>{
                  return (<Order key={order?._id} order={order?.myCart} tableNumber={order?.tableNumber} remove={()=>removeOrder(index)}/>)})}
              </Box>
            <Box className={classes.container}>
                {ordersCooked.arr?.map((order, index, array)=>{
                  return (<Order key={order?._id} cooked order={order?.myCart}  tableNumber={order?.tableNumber}/>)})}
              </Box>
            </>}
          </>
      )}
      <WaiteroAlert isError={restaurantReducer.hasErrors} message={restaurantReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  restaurantReducer: state?.restaurantReducer,
  ordersRed: state?.restaurantReducer?.restaurant?.orders,
  restaurants: state?.clientReducer?.client?.restaurants,
  clientData: state?.clientReducer?.client
})

const mapDispatchToProps = (dispatch) => ({
  getOrders: (clientId, restaurantId, loadingSetter) => dispatch(getOrders(clientId, restaurantId, loadingSetter)),
  cleanErrorMessage: () => dispatch(cleanErrorMessageRestaurant())
})


export default connect(mapStateToProps, mapDispatchToProps)(Orders);