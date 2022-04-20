import React from "react";
import {registerLocale} from 'react-datepicker';
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import CarroTextField from "../text-field/carro-text-field";
import {ro} from "date-fns/locale";

registerLocale('ro', ro);

const DatePickerTh = createTheme({
    palette:{
        primary: {
            500:'#00b4d8',
        }, 
    },
});

const CarroDatePicker = (props)=>{

    return(
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ro}>
                <ThemeProvider theme={DatePickerTh}>
                    <KeyboardDatePicker
                            disableToolbar
                            value={props.dateValue}
                            inputVariant="outlined"
                            variant='inline'
                            label={props.label}
                            views={props.views}
                            format={props.format}
                            openTo={props.openTo}
                            TextFieldComponent={CarroTextField}
                            onChange={props.handleDateSelect}
                            defaultValue={props.defaultShow}
                            fullWidth
                            {...props}
                        />  
                </ThemeProvider>
            </MuiPickersUtilsProvider>
    );

};

export default CarroDatePicker;