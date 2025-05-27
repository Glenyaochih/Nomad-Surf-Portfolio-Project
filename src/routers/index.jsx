import { createHashRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import SurfKnowledge from '../pages/SurfKnowledge';
import Admin from '../pages/Admin';
import AdminChildrenMember from '../pages/AdminChildrenMember';
import AdminChildrenComment from '../pages/AdminChildrenComment';
import AdminChildrenProduct from '../pages/AdminChildrenProduct';
import MemberLoadingPage from '../pages/MemberLoadingPage';

const route = [
  {
    path: 'admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <AdminChildrenProduct />,
      },
      {
        path: 'members',
        element: <AdminChildrenMember />,
      },
      {
        path: 'comment',
        element: <AdminChildrenComment />,
      },
    ],
  },
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
        path: 'members',
        element: <MemberLoadingPage />,
      },
      {
        path: 'article',
        element: <SurfKnowledge />,
      },
    ],
  },
];

const router = createHashRouter(route);
export default router;
