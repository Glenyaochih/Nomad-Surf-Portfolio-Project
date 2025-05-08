import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './assets/scss/all.scss';
import router from './routers';

createRoot(document.getElementById('root')).render(
  <IconContext value={{ className: 'react-icon' }}>
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  </IconContext>
);
