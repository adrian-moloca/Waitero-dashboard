import React,{ useState } from "react";
import { Box, LinearProgress, Paper } from "@material-ui/core";
import PageContainer from "../../components/container/page-container/page-container.jsx";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.jsx";
import WaiteroTextField from "../../components/text-field/waitero-text-field.jsx";
import SearchIcon from '@material-ui/icons/Search';
import UsersTable from "../../components/UsersTable/UsersTable"
import { InputAdornment, Card } from "@material-ui/core";
import { useEffect } from "react";
import useStyles from "./ordersStyle.jsx";
import Order from "../../components/box/order-card/order-card.jsx";
import { cleanClient } from "../../redux/types/ClientTypes.js";
import useInterval from "../../utils/functions/useInterval.js";

const Orders = () => {

  const classes = useStyles();

  const [orders, setOrders] = useState({arr: []})
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
 
  const getOrdersStart = () => {
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
  }

  useEffect(()=>{
    getOrdersStart()
  },[])

  useInterval(getOrdersStart, 20000)

  return (
    <PageContainer>
        <Box display='flex' width={'90%'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Box textAlign='left' width={'100%'} fontSize='35px'>
                Comenzi
              </Box>
            </Box>
            <Box className={classes.container}>
                {orders.arr?.map((order, index, array)=>{
                  return (<Order key={order?._id} order={order} remove={()=>removeOrder(index)}/>)})}
                {ordersCooked.arr?.map((order, index, array)=>{
                  return (<Order key={order?._id} cooked order={order}/>)})}
              </Box>
    </PageContainer>
  );
};

export default Orders;