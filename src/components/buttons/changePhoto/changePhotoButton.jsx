import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { getBase64Image } from '../../../utils/functions/base64Image';

const ChangePhotoButton = ({ name, setPhoto }) => {
    
    const [source, setSource] = useState('');

    const createCoverPhoto= async (photo)=>{
        const base64 = await getBase64Image(photo)
        setSource(base64)
    }

    useEffect(() => {
        if (source.length)
            setPhoto(source)
    },[source])

    return (
        <>
            <input type={'file'} name={`select-${name})`} accept='image/*' id={`select-${name})`} style={{ display: 'none', height: 0, width: 0 }} onChange={e => createCoverPhoto(e.target.files[0])} />
            <Button style={{ width: 200, height: 60 }}><label htmlFor={`select-${name})`} style={{ width: 200, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Publish style={{paddingRight: 10 }} /> Schimba poza</label></Button>
        </>
    )

}

export default ChangePhotoButton;