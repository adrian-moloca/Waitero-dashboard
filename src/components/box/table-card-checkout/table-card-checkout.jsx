import React, {useState, Fragment} from "react";
import { Paper, Box, Modal, Fade, IconButton } from "@material-ui/core";
import { Check, CreditCard, Money } from "@material-ui/icons";
import useStyles from "../../modal/modal-style";
import WaiteroCheckbox from "../../checkbox/waitero-checkbox";
import PrimaryButton from "../../buttons/primaryButton/primaryButton";
import SecondaryButton from "../../buttons/secondaryButton/secondaryButton";

const TableCardCheckout = ({title, arr}) => {

    const [elevation, setElevation] = useState(4);
    const [open, setOpen] = useState(false)
    const [itemsSeletedForPayment, setItemsSeletedForPayment] = useState([]);

    const classes = useStyles()

    const toggleItemForPayment = (item) => {
        const temp =[...itemsSeletedForPayment];
        if(itemsSeletedForPayment.includes(item)){
            const ind = temp.indexOf(item)
            temp.splice(ind, 1)
        }
        else 
            temp.push(item)
        setItemsSeletedForPayment(temp)
    }

    const calculateTotal = () => {
        let totalC = 0;
        for(let i = 0; i<arr?.length; i++){
            for(let j = 0; j<arr[i]?.myCart?.plates?.length; j++){
                totalC += arr[i]?.myCart?.plates[j]?.platePrice
            }
            for(let j = 0; j<arr[i]?.myCart?.drinks?.length; j++){
                totalC += arr[i]?.myCart?.drinks[j]?.drinkPrice
            }
            for(let j = 0; j<arr[i]?.myCart?.extras?.length; j++){
                totalC += arr[i]?.myCart?.extras[j]?.extraPrice
            }
        }
        return totalC
    }

    const calculateTotalSelected = () => {
        let totalC = 0;
        for(let i = 0; i<itemsSeletedForPayment?.length; i++){
                totalC += (itemsSeletedForPayment[i]?.platePrice || itemsSeletedForPayment[i]?.drinkPrice || itemsSeletedForPayment[i]?.extraPrice)
        }
        return totalC
    }

    return (
        <>
            <Box marginRight={4} marginBottom={3} onClick={()=>setOpen(true)}>
                <Paper style={{ height: 300, width: 200, borderRadius: 5, cursor: 'pointer', backgroundColor: '#fff', display: 'flex', flexDirection:'column', alignItems: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'flex-end'}
                        width={'100%'} height={'30%'} fontSize={50} fontWeight={'bold'} color={'rgba(255, 90, 95, 1)'} textAlign={'center'}>
                        {title}
                    </Box>
                    <Box height={'70%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Box style={{ fontSize: 30, color: '#00000080' }}>LEI</Box>
                        <Box style={{ fontSize: 50, color: '#00000080' }}  >{calculateTotal()}</Box >
                    </Box>
                </Paper>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
            <Fade in={open} timeout={600}>
                <Box display="flex"  justifyContent={'space-between'} style={{padding: '40px 100px'}} className={classes.paper}>
                    <Box flexDirection="column" width={'50%'} justifyContent="center" alignItems="flex-start">
                {arr.map((item, index)=>{return (<Fragment key={item._id}>
                <Box style={{paddingTop: 10}} fontWeight={500} fontSize={20} color={'#00000080'}>Client {index + 1}</Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'} width={'50%'} fontSize={15} paddingTop={'4px'} fontWeight={'400'} > {item.myCart.plates?.map((plate, index)=>{return (
                    <Fragment key={plate._id}>
                        <Box display={'flex'} justifyContent={'center'} fontWeight={500} fontStyle={'italic'} fontSize={18} color={'#000000'}>
                            <WaiteroCheckbox checked={itemsSeletedForPayment.includes(plate)} onChange={()=> toggleItemForPayment(plate)} style={{padding: 0, paddingRight: 5}}/> {plate.plateName} <Box color={'#00000090'} style={{ padding: '0 4px'}} fontSize={18} marginLeft={1} fontStyle={'normal'} >lei {plate.platePrice}</Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} paddingLeft={3} fontSize={15}>
                            {plate.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )})} </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}  width={'100%'} fontSize={15}  paddingTop={'4px'} fontWeight={'400'} > {item.myCart.drinks?.map((drink, index)=>{return (
                    <Fragment key={drink._id}>
                        <Box display={'flex'} justifyContent={'center'} fontWeight={500} fontStyle={'italic'} fontSize={18} color={'#000000'}>
                        <WaiteroCheckbox checked={itemsSeletedForPayment.includes(drink)} onChange={()=> toggleItemForPayment(drink)} style={{padding: 0, paddingRight: 5}}/>{drink.drinkName} <Box color={'#00000090'} style={{ padding: '0 4px'}} fontSize={18} marginLeft={1} fontStyle={'normal'} >lei {drink.drinkPrice}</Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} paddingLeft={3} fontSize={15} >
                            {drink.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )})} </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'} width={'100%'}  fontSize={15}  paddingTop={'4px'} fontWeight={'400'} > {item.myCart.extras?.map((extra, index)=>{return (
                    <Fragment key={extra._id}>
                        <Box display={'flex'} justifyContent={'center'}  fontWeight={500} fontStyle={'italic'} fontSize={18} color={'#000000'}>
                        <WaiteroCheckbox checked={itemsSeletedForPayment.includes(extra)} onChange={()=> toggleItemForPayment(extra)} style={{padding: 0, paddingRight: 5}}/>{extra.extraName} <Box color={'#00000090'} style={{ padding: '0 4px'}} fontSize={18} marginLeft={1} fontStyle={'normal'} >lei {extra.extraPrice}</Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} paddingLeft={3} fontSize={15}  >
                            {extra.suplimentaryDescription}
                        </Box>
                    </Fragment>
                )
                })} </Box></Fragment>)})}
                    </Box>
                    <Box display={'flex'} flexDirection="column" width={'50%'} justifyContent={"flex-end"} alignItems={"flex-end"}>
                        <Box width={'100%'} textAlign={'right'} fontSize={35}>Total selectat {calculateTotalSelected()}</Box>
                        <Box width={300} textAlign={'right'} fontSize={35}><SecondaryButton variant="contained" fullWidth  size="large">PLATA CASH <Money style={{marginLeft: 5}}/> </SecondaryButton></Box>
                        <Box width={300} textAlign={'right'} fontSize={35}><SecondaryButton variant="contained" fullWidth size="large">PLATA CARD <CreditCard style={{marginLeft: 5}}/> </SecondaryButton></Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
        </>
    );
}

export default TableCardCheckout;