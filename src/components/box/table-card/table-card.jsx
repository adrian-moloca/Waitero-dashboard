import React from "react";
import { Paper, Box } from "@material-ui/core";
import { useState } from "react";

const TableCard = ({title, qrcode}) => {

    const [elevation, setElevation] = useState(4);

    return (
        <Paper style={{ height: 300, width: 200, borderRadius: 5, cursor: 'pointer', backgroundColor: '#00000099', display: 'flex', flexDirection:'column', alignItems: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                width={'80%'} height={'100%'} fontSize={22} color={'white'} textAlign={'center'}>
                {title}
            </Box>
            <Box style={{backgroundColor: '#000', hegiht: 80, width: 80}}>

            </Box>
        </Paper>
    );
}

export default TableCard;