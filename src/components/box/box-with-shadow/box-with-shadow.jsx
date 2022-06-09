import React, { useState} from 'react';
import {Box, Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

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

const BoxWithShadow = ({source, overlayText, isButton, height, width, setSource, justifyContent}) =>{

    const [onHover, setOnHover] = useState(false);

    return(
    <>
                    <input type='file' name='select-cover-photo' accept='image/*' id={'select-cover-photo'} style={{ display: 'none', height: 0, width: 0 }} onChange={e => setSource(URL.createObjectURL(e.target.files[0])) }/>
            {isButton ? (
            <MyPaper style={{
                backgroundImage: `url(${source})`,
                backgroundSize: 'cover',
                    filter: onHover ? `grayscale(1)` : '',
                    justifyContent: justifyContent ? justifyContent : 'center',
                height: height,
                    width: width,
                cursor: 'pointer'
                }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
                    {onHover ? <label for='select-cover-photo' style={{height: '100%', width: '100%', backdropFilter: 'brightness(40%)', borderRadius: 5, cursor: 'pointer'}} onClick={(e)=>console.log('LABEL ', e)}>
                         <Box fontSize={height / 4} fontWeight={'bold'} marginX={2} color={'white'}>{overlayText}</Box>
                    </label> : null}
            </MyPaper>) : (
                <MyPaper style={{
                backgroundImage: `url(${source})`,
                        backgroundSize: 'cover',
                justifyContent: justifyContent ? justifyContent : 'center',
                height: height,
                width: width,
            }} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            { onHover ? <Box fontSize={height / 4} fontWeight={'bold'} marginX={2} color={'white'}>{ overlayText }</Box> : null}
            </MyPaper> ) }
    </>
    );
}

export default BoxWithShadow;