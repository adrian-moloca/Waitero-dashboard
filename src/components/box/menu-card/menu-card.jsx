import React from "react";
import { Paper, Box } from "@material-ui/core";
import { useState } from "react";

const MenuCard = ({title}) => {

    const [elevation, setElevation] = useState(4);

    return (
        <Paper style={{ height: 170, width: 280, borderRadius: 5, cursor: 'pointer', backgroundColor: '#00000099', display: 'flex', justifyContent: 'center' }} onMouseOver={()=>setElevation(24)} onMouseOut={()=>setElevation(4)} elevation={elevation}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                width={'80%'} height={'100%'} fontSize={22} color={'white'} textAlign={'center'}>
                {title}
            </Box>
        </Paper>
    );
}

export default MenuCard;