import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import './theme.scss';
import './assets/css/themify-icons.css';
import './assets/css/style.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.component} exact={true} />
        ))}
      </Routes>
      <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
