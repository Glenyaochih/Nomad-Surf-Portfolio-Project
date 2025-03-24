import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';

import './assets/scss/all.scss';
import router from './routers';

createRoot(document.getElementById('root')).render(
  <IconContext value={{className:'react-icon'}}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </IconContext>
);
