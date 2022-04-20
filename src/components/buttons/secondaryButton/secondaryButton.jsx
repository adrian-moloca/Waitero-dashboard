import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const SecondaryButton = withStyles({
    contained:{
        color: '#fff',
        backgroundColor: '#F50057',
        '&:hover': {
            color: '#F50057',
            backgroundColor: '#fff',
        },
    },

    outlined:{
        color: '#F50057',
        backgroundColor: '#FFF',
        borderColor:'#F50057',
        '&:hover': {
            color: '#FFF',
            backgroundColor: '#F50057',
        },
    },

})(Button);

export default SecondaryButton;