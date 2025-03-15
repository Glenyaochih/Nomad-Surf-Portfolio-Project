import { createHashRouter } from 'react-router-dom';
import App from '../App';

const route = [
  {
    path: '/',
    element: <App />,
    children: [{}],
  },
];

const router = createHashRouter(route);
export default router;
