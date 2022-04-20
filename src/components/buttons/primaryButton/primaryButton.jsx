import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const PrimaryButton = withStyles({

    contained:{
      color: '#fff',
      backgroundColor: '#00b4d8',
      '&:hover': {
        color: '#00b4d8',
        backgroundColor: '#fff',
      }
    }

})(Button);

export default PrimaryButton;