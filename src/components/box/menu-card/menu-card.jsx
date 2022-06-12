import React from "react";
import { Paper, Box, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const MenuCard = ({title}) => {

    return (
        <Paper style={{ height: 170, width: 280, borderRadius: 5, cursor: 'pointer', backgroundColor: '#00000099', display: 'flex', justifyContent: 'center' }}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                width={'80%'} height={'100%'} fontSize={22} color={'white'} textAlign={'center'}>
                {title}
            </Box>
        </Paper>
    );
}

export default MenuCard;