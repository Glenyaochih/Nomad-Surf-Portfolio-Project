import { createHashRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import SurfKnowledge from '../pages/SurfKnowledge';
import Admin from '../pages/Admin';
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
      {
        path: 'cart',
        element: <ShoppingCartPage />,
      },
      {
        path: 'article',
        element: <SurfKnowledge />,
      },
      {
        path:'admin',
        element:<Admin/>
      }
    ],
  },
];

const router = createHashRouter(route);
export default router;
