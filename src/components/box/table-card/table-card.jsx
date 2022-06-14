import React from "react";
import { Paper, Box } from "@material-ui/core";
import { useState } from "react";
import { Add, AddBoxTwoTone, AddCircle } from "@material-ui/icons";

const TableCard = ({title, qrcode}) => {

    const [elevation, setElevation] = useState(4);

    return (
        <Paper style={{ height: 300, width: 200, borderRadius: 5, cursor: 'pointer', backgroundColor: '#fff', display: 'flex', flexDirection:'column', alignItems: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                width={'100%'} height={'50%'} fontSize={22} fontWeight={'bold'} color={'rgba(255, 90, 95, 1)'} textAlign={'center'}>
                {title}
            </Box>
            <Box height={'50%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
                {!qrcode && <AddBoxTwoTone style={{ height: 130, width: 150 }} />}
                {qrcode &&  <Paper style={{ backgroundImage: `url(${qrcode})` }}/>}
                
            </Box>
        </Paper>
    );
}

export default TableCard;