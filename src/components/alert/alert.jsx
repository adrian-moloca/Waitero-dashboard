import React from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

const WaiteroAlert = ({message, isError, cleanError}) => {
    return <>
        <Snackbar open={message?.length > 0} onClose={()=> cleanError()} autoHideDuration={3000} anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            TransitionComponent={(props) => { return <Slide {...props} direction={'left'} /> }}>
            <Alert elevation={20}  onClose={() => cleanError()} severity={isError ? 'error' : 'success'}>
                {message}
            </Alert>
        </Snackbar>
    </>
}

export default WaiteroAlert