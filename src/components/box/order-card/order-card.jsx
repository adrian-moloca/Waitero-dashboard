import React,{ useState, useEffect } from "react";
import { Paper, Box, IconButton, Zoom } from "@material-ui/core";
import useInterval from "../../../utils/functions/useInterval";
import { BlurOff, Brightness1, CheckBoxOutlineBlankTwoTone, CheckBoxTwoTone, DoneOutlined } from "@material-ui/icons";
import { useRef } from "react";

const Order =({order, remove, cooked}) => {

    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds] =useState(0);
    const [ taken, setTaken ] = useState(false);
    const [ ready, setReady] = useState(cooked || false);
    const [ elevation, setElevation ] = useState(4);
    const [ orderS, setOrderS ] =useState(order)
    const isUnmounting =useRef();

    const getStatusColor = () => {
        if(ready){
            return 'rgba(0, 0, 0, 0.5)'
        } else if(taken){
            return 'rgba(35, 87, 34, 0.8)'
        } else if (minutes*60+seconds > 600){
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
        return ()=> {
            isUnmounting.current =true;
        }
    }, [order])

    return (
        <Zoom in={seconds>0 || ready} out={isUnmounting.current} timeout={{appear: 100, enter: 200, exit: 500}}>
            <Paper style={{width: '220px', minHeight: '350px', padding: 20, margin: 20, display:'flex', flexDirection: 'column', justifyContent:'space-between', alignItems:'center', opacity: ready ? '0.6' : '1'}} elevation={elevation}>
                <Box display={'flex'} style={{backgroundColor: getStatusColor()}} borderRadius={4} height={60} width={'100%'} justifyContent={'center'} fontSize={25} fontWeight={'bold'} color={'#f1f1f1'} alignItems={'center'}>{orderS.tableNumber}</Box>
                <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} > {minutes.toString()}:{parseInt(seconds) < 10 ?  `0${seconds}` : seconds} </Box>

                {!taken && !ready && <IconButton onClick={()=>{setTaken(true); setElevation(14);}} ><BlurOff style={{fontSize:'50px'}}/></IconButton>}
                {taken && !ready && <IconButton onClick={()=>{setReady(true); setElevation(4); remove();}} ><CheckBoxOutlineBlankTwoTone style={{fontSize:'50px'}}/></IconButton>}
                {ready && <IconButton disabled={true} ><CheckBoxTwoTone style={{fontSize:'50px'}}/></IconButton>}
            </Paper>
        </Zoom>
    );
}

export default Order; 