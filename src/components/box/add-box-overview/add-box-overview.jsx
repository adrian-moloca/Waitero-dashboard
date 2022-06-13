import React, {useState} from 'react';
import { Box, IconButton, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { AddCircleTwoTone, HomeTwoTone, TableChartTwoTone, AccountBoxTwoTone, ArtTrackTwoTone, VpnKeyTwoTone} from '@material-ui/icons';

const AddBoxOverview = ({source, overlayText, height, width, color, backgroundColor, justifyContent, flexDirection, alignItems, onClick, iconAdd, iconList, iconHome, iconPassword, iconDisplay}) =>{

    const [onHover, setOnHover] = useState(false);
    
    const MyPaper = withStyles({
        root:{
            display:'flex',
            padding:0,
            justifyContent: 'left',
            alignItems: 'flex-end',
            borderRadius: '5px',
            /* boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)' */
            transition: 'filter 0.5s',
            '&:hover': {
                cursor: 'pointer',
                filter: 'contrast(200%)' 
            }
        }

    })(Paper);

    return(
    <>
            <MyPaper style={{
                backgroundImage: `url(${source})`,
                backgroundSize: 'cover',
                backgroundColor: backgroundColor,
                display: 'flex',
                justifyContent: justifyContent || 'center',
                alignItems: alignItems || 'middle',
                flexDirection: flexDirection || 'row',
                height: height,
                width: width,
            }} onMouseEnter={(e) => setOnHover(true)} onMouseLeave={() => setOnHover(false)} onClick={onClick} variant='elevation' translate='yes' elevation={10}>
                {iconPassword ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><VpnKeyTwoTone style={{ height: 75, width: 75, color:color ? color : '#fff', padding:'30px' }} /> </IconButton> : null}
                <Box padding={3} fontSize={height / 5} fontWeight={'bold'} color={color ? color : (onHover ? 'white' : '#ffffff80')}>{overlayText}</Box>
                {iconAdd ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><AddCircleTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', padding:'30px' }} /> </IconButton> : null}
                {iconList ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><TableChartTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
                {iconHome ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><HomeTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
                {iconDisplay ? <IconButton style={{ height: 75, width: 75, dispay: 'flex', justifyContent: 'center', margin: 10 }} ><ArtTrackTwoTone style={{ height: 75, width: 75, color: color ? color : '#fff', paddingBottom: '100px' }} /> </IconButton> : null}
            </MyPaper>
        </>
    );
}

export default AddBoxOverview;