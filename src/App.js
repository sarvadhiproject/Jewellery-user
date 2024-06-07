import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import RoutesConfig from './routes';
import './theme.scss';
import './assets/css/themify-icons.css';
import './assets/css/style.css';
import axios from 'axios';

axios.interceptors.request.use(config => {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{
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
