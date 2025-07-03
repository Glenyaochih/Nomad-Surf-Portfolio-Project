import { createHashRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/front/HomePage';
import ProductListPage from '../pages/front/ProductListPage';
import ProductDetailPage from '../pages/front/ProductDetailPage';
import ShoppingCartPage from '../pages/front/ShoppingCartPage';
import SurfKnowledge from '../pages/front/SurfKnowledge';
import ShowerMapPage from '../pages/front/ShowerMapPage';
import WaveReportPage from '../pages/front/WaveReportPage';
import MemberLoadingPage from '../pages/front/MemberLoadingPage';
import Admin from '../pages/admin/Admin';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import AdminCouponsPage from '../pages/admin/AdminCouponsPage';
import ConfirmOrder from '../pages/front/ConfirmOrder';
import ConfirmPayment from '../pages/front/ConfirmPayment';
import FinishedOrder from '../pages/front/FinishedOrder';

const route = [
  {
    path: 'admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <AdminProductsPage />,
      },
      {
        path: 'order',
        element: <AdminOrdersPage />,
      },
      {
        path: 'coupon',
        element: <AdminCouponsPage />,
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
        children: [
          { index: true, element: <ConfirmOrder /> },
          { path: 'payment', element: <ConfirmPayment /> },
          { path: 'finished-order', element: <FinishedOrder /> },
        ],
      },
      {
        path: 'members',
        element: <MemberLoadingPage />,
      },
      {
        path: 'article',
        element: <SurfKnowledge />,
      },
      {
        path: '/shower-map',
        element: <ShowerMapPage />,
      },
      {
        path: '/wave',
        element: <WaveReportPage />,
      },
    ],
  },
];

const router = createHashRouter(route);
export default router;
