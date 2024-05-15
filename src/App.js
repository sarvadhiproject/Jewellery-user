import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import RoutesConfig from './routes';
import './theme.scss';
import './assets/css/themify-icons.css';
import './assets/css/style.css';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
          <RoutesConfig />
        </SnackbarProvider>
      </BrowserRouter>

    </React.Fragment>
  );
}

export default App;
