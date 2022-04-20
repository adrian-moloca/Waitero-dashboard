import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Checkbox} from '@material-ui/core';

const CarroCheckbox = withStyles({
    checked: {
        color: '#00b4d8',
    },
})((props)=><Checkbox color="default" {...props}/>);

export default CarroCheckbox;