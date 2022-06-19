import React,{ useState, useEffect } from "react";
import { Paper, Box, IconButton } from "@material-ui/core";
import useInterval from "../../../utils/functions/useInterval";
import { BlurOff, Brightness1, CheckBoxOutlineBlankTwoTone, CheckBoxTwoTone, DoneOutlined } from "@material-ui/icons";

const Order =({order, remove, cooked}) => {

    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds] =useState(0);
    const [ taken, setTaken ] = useState(false);
    const [ ready, setReady] = useState(cooked || false);
    const [ orderS, setOrderS ] =useState(order)

    const getStatusColor = () => {
        if(ready){
            return 'rgba(0, 0, 0, 0.5)'
        } else if(taken){
            return 'rgba(35, 87, 34, 0.8)'
        } else if (minutes*60+seconds > 50){
            return 'rgba(255, 90, 95, 1)'
        } else {
            return 'rgba(169, 103, 6, 0.8)'
        }
    }

    const increaseSec = () => {
        if(!ready)
        if(seconds===59){
            setSeconds(0)
            setMinutes((minutes)=>minutes+1)
        }
        else
            setSeconds(seconds + 1)
    }

    useInterval(increaseSec, 1000)

    useEffect(()=>{
        setOrderS(order)
        setReady(cooked)
    }, [order])

    return (
        <Paper style={{minWidth: '180px', minHeight: '300px', padding: 20, margin: 20, display:'flex', flexDirection: 'column', justifyContent:'space-between', alignItems:'center', backdropFilter: ready ? 'brightness(40%)' : 'none'}} elevation={4}>
            <Box display={'flex'} style={{backgroundColor: getStatusColor()}} borderRadius={4} height={60} width={'100%'} justifyContent={'center'} fontSize={25} fontWeight={'bold'} color={'#f1f1f1'} alignItems={'center'}>{order.tableNumber}</Box>
            <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} > {minutes.toString()}:{parseInt(seconds) < 10 ?  `0${seconds}` : seconds} </Box>
            {!taken && !ready && <IconButton onClick={()=>setTaken(true)} ><BlurOff style={{fontSize:'50px'}}/></IconButton>}
            {taken && !ready && <IconButton onClick={()=>{setReady(true); remove();}} ><CheckBoxOutlineBlankTwoTone style={{fontSize:'50px'}}/></IconButton>}
            {ready && <IconButton disabled={true} ><CheckBoxTwoTone style={{fontSize:'50px'}}/></IconButton>}
        </Paper>
    );
}

export default Order; 