import React from "react";
import { Box } from "@material-ui/core";
import { AddBoxTwoTone } from "@material-ui/icons";

const AddContent = ({title}) => {
    return (
        <Box display={'flex'}>
            {title}
            <AddBoxTwoTone style={{fontSize: '50px'}}/>
        </Box>
    );
}

export default AddContent;