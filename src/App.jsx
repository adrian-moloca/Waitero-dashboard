import React from 'react';
import Routes from './utils/Routing/Routing';
import './App.css';
 
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  typography: { fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'].join(',')},
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
