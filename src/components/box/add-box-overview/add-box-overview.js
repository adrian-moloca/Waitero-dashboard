import React, {Fragment, useState} from 'react';
import {Box, IconButton, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AddCircleTwoTone, TableChartTwoTone } from '@material-ui/icons';

const MyPaper = withStyles({

    root:{
        display:'flex',
        padding:0,
        justifyContent: 'left',
        alignItems: 'flex-end',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        borderRadius:'5px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }

})(Paper);

const AddBoxOverview = ({source, overlayText, isButton, height, width, setSource, iconAdd, iconList, color, backgroundColor, justifyContent, flexDirection, alignItems, onClick}) =>{

    const [onHover, setOnHover] = useState(false);

    return(
    <>
            <MyPaper style={{
                backgroundImage: `url(${source})`,
                backgroundSize: 'cover',
                backgroundColor: backgroundColor,
                filter: onHover ? `contrast(200%)` : '',
                display: 'flex',
                justifyContent: justifyContent ? justifyContent :'center',
                alignItems: alignItems ? alignItems : 'middle',
                flexDirection: flexDirection ? flexDirection : 'row',
                cursor: 'pointer',
                height: height,
                width: width
                }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} onClick={onClick} >
                <Box padding={3} fontSize={height / 5} fontWeight={'bold'} color={color ? color : (onHover ? 'white' : '#ffffff80')} style={{ cursor: 'pointer' }}>{overlayText}</Box>
                {iconAdd ? <IconButton style={{ height: 100, width: 100, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><AddCircleTwoTone style={{ height: 100, width: 100, color: '#fff', padding:'30px' }} /> </IconButton> : null}
                {iconList ? <IconButton style={{ height: 100, width: 100, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><TableChartTwoTone style={{ height: 100, width: 100, color: '#fff', marginBottom:'30px' }} /> </IconButton> : null}
            </MyPaper>
    </>
    );
}

export default AddBoxOverview;