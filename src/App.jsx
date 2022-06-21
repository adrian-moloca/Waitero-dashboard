import React from 'react';
import Routes from './utils/Routing/Routing';
import './App.css';
 
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255, 90, 95, 1)'
    },
  }
});

const App = () =>{
  return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
  );
};

export default App;
