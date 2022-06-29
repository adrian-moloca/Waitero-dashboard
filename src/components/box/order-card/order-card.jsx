import React,{ useState, useEffect, Fragment } from "react";
import { Paper, Box, IconButton, Zoom } from "@material-ui/core";
import useInterval from "../../../utils/functions/useInterval";
import { BlurOff, Brightness1, Check, CheckBoxOutlineBlankTwoTone, CheckBoxTwoTone, DoneOutlined } from "@material-ui/icons";
import { useRef } from "react";

const Order =({order, tableNumber, remove, cooked}) => {

    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds] =useState(0);
    const [ taken, setTaken ] = useState(false);
    const [ ready, setReady ] = useState(cooked || false);
    const [ elevation, setElevation ] = useState(4);
    const [ plates, setPlates ] = useState(order.plates);
    const [ drinks, setDrinks ] = useState(order.drinks);
    const [ extras, setExtras ] = useState(order.extras);
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

    const setPrepared = (type, indexC) => {
        // if (plates.filter((el, indexD) => !el.prepared || !(type === 0 && indexD === indexC)).length === 0 && drinks.filter((el, indexD) => !el.prepared || !(type === 1 && indexD === indexC)).length === 0 && extras.filter((el, indexD) => !el.prepared || (type === 2 && indexD === indexC)).length === 0) {
        //     setReady(true);
        //     setElevation(4);
        //     remove();
        // }
        switch (type) {
            case 0: {
                setPlates(platesO => platesO.map((el, index) => {
                    if(indexC === index)
                        return {
                            ...el,
                            prepared: true
                        }
                    else
                        return el
                }))
                break;
            }   
            case 1:  {
                setDrinks(drinksO => drinksO.map((el, index) => {
                    if(indexC === index)
                        return {
                            ...el,
                            prepared: true
                        }
                    else
                        return el
                }))
                break;
            }   
            case 2:  {
                setExtras(extrasO => extrasO.map((el, index) => {
                    if(indexC === index)
                        return {
                            ...el,
                            prepared: true
                        }
                    else
                        return el
                }))
                break;
            }   
            default: 
                return null
        }

    }

    useInterval(increaseSec, 1000)

    useEffect(()=>{
        setReady(cooked)
        setPlates(order?.plates)
        setDrinks(order?.drinks)
        setExtras(order?.extras)
        return ()=> {
            isUnmounting.current =true;
        }
    }, [order])

    return (
        <Zoom in={seconds > 0 || ready } exit={isUnmounting.current} timeout={{appear: 100, enter: 200}}>
            <Paper style={{width: '300px', height: 'max-content', padding: 20, paddingTop:5, paddingBottom: 70, margin: 20, position:'relative', display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems:'center', opacity: ready ? '0.6' : '1'}} elevation={elevation}>
                <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} paddingY={1} > {minutes.toString()}:{parseInt(seconds) < 10 ?  `0${seconds}` : seconds} </Box>
                <Box display={'flex'} style={{ backgroundColor: getStatusColor() }} borderRadius={4} paddingBottom={1} height={60} width={'100%'} justifyContent={'center'} fontSize={25} fontWeight={'bold'} color={'#f1f1f1'} alignItems={'center'}>{tableNumber}</Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} paddingY={1} justifyContent={'center'} width={'100%'} fontSize={20} fontWeight={'400'} > {plates?.map((plate, index)=>{return (
                    <Fragment key={plate._id}>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} color={'rgba(35, 87, 34, 0.8)'} style={{ textDecoration: plate.prepared || ready ? 'line-through' : 'none'}} >
                            <IconButton onClick={() => setPrepared(0, index)} size={'small'} disabled={plate.prepared || !taken}><Check/></IconButton>Preparate
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20}  style={{ textDecoration: plate.prepared || ready ? 'line-through' : 'none'}} >
                            {plate.plateName}
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={16}  style={{ textDecoration: plate.prepared || ready ? 'line-through' : 'none'}} >
                            {plate.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )})} </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}  paddingY={1} width={'100%'} fontSize={20} fontWeight={'400'} > {drinks?.map((drink, index)=>{return (
                    <Fragment key={drink._id}>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} color={'rgba(35, 87, 34, 0.8)'}  style={{ textDecoration: drink.prepared || ready ? 'line-through' : 'none'}} >
                            <IconButton onClick={() => setPrepared(1, index)} size={'small'} disabled={drink.prepared || !taken}><Check/></IconButton>Bauturi
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20} style={{ textDecoration: drink.prepared || ready ? 'line-through' : 'none'}}>
                            {drink.drinkName}
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={16} style={{ textDecoration: drink.prepared || ready ? 'line-through' : 'none'}}>
                            {drink.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )})} </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'} width={'100%'}  paddingY={1} fontSize={20} fontWeight={'400'} > {extras?.map((extra, index)=>{return (
                    <Fragment key={extra._id}>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20} fontWeight={'bold'} color={'rgba(35, 87, 34, 0.8)'} style={{ textDecoration: extra.prepared || ready ? 'line-through' : 'none'}}>
                            <IconButton onClick={() => setPrepared(2, index)} size={'small'} disabled={extra.prepared || !taken}><Check/></IconButton>Extra
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={20}  style={{ textDecoration: extra.prepared || ready ? 'line-through' : 'none'}}>
                            {extra.extraName}
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} fontSize={16}  style={{ textDecoration: extra.prepared || ready ? 'line-through' : 'none'}}>
                            {extra.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )
                })} </Box>
                <Box position={'absolute'} bottom={0}>
                    {!taken && !ready && <IconButton onClick={()=>{setTaken(true); setElevation(14);}} ><BlurOff style={{fontSize:'50px'}}/></IconButton>}
                    {taken && !ready && <IconButton onClick={()=>{setReady(true); setElevation(4); remove();}} ><CheckBoxOutlineBlankTwoTone style={{fontSize:'50px'}}/></IconButton>}
                    {ready && <IconButton disabled={true} ><CheckBoxTwoTone style={{fontSize:'50px'}}/></IconButton>}
                </Box>
            </Paper>
        </Zoom>
    );
}

export default Order; 