import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const SecondaryButton = withStyles({
    contained:{
        color: '#fff',
        backgroundColor: 'rgba(255, 90, 95, 1)',
        '&:hover': {
            color: 'rgba(255, 90, 95, 1)',
            backgroundColor: '#fff',
        },
    },

    outlined:{
        color: 'rgba(255, 90, 95, 1)',
        backgroundColor: '#FFF',
        borderColor:'rgba(255, 90, 95, 1)',
        '&:hover': {
            color: '#FFF',
            backgroundColor: 'rgba(255, 90, 95, 1)',
        },
    },

})(Button);

export default SecondaryButton;