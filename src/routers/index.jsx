import { createHashRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage'
import ProductDetailPage from '../pages/ProductDetailPage'

const route = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductListPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
];

const router = createHashRouter(route);
export default router;
