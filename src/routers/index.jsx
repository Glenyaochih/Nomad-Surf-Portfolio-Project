import React, { Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';

// 動態導入所有頁面組件
const App = React.lazy(() => import('../App'));
const HomePage = React.lazy(() => import('../pages/front/HomePage'));
const ProductListPage = React.lazy(
  () => import('../pages/front/ProductListPage')
);
const ProductDetailPage = React.lazy(
  () => import('../pages/front/ProductDetailPage')
);
const ShoppingCartPage = React.lazy(
  () => import('../pages/front/ShoppingCartPage')
);
const ShowerMapPage = React.lazy(() => import('../pages/front/ShowerMapPage'));
const WaveReportPage = React.lazy(
  () => import('../pages/front/WaveReportPage')
);
const MemberLoadingPage = React.lazy(
  () => import('../pages/front/MemberLoadingPage')
);
const Admin = React.lazy(() => import('../pages/admin/Admin'));
const AdminProductsPage = React.lazy(
  () => import('../pages/admin/AdminProductsPage')
);
const AdminOrdersPage = React.lazy(
  () => import('../pages/admin/AdminOrdersPage')
);
const AdminCouponsPage = React.lazy(
  () => import('../pages/admin/AdminCouponsPage')
);
const ConfirmOrder = React.lazy(() => import('../pages/front/ConfirmOrder'));
const ConfirmPayment = React.lazy(
  () => import('../pages/front/ConfirmPayment')
);
const FinishedOrder = React.lazy(() => import('../pages/front/FinishedOrder'));

const route = [
  {
    path: 'admin',
    element: (
      <Suspense fallback={<div>Loading Admin...</div>}>
        <Admin />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Admin Products...</div>}>
            <AdminProductsPage />
          </Suspense>
        ),
      },
      {
        path: 'order',
        element: (
          <Suspense fallback={<div>Loading Admin Orders...</div>}>
            <AdminOrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'coupon',
        element: (
          <Suspense fallback={<div>Loading Admin Coupons...</div>}>
            <AdminCouponsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading App...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home Page...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<div>Loading Products List...</div>}>
            <ProductListPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<div>Loading Product Detail...</div>}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading Shopping Cart...</div>}>
            <ShoppingCartPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading Confirm Order...</div>}>
                <ConfirmOrder />
              </Suspense>
            ),
          },
          {
            path: 'payment',
            element: (
              <Suspense fallback={<div>Loading Confirm Payment...</div>}>
                <ConfirmPayment />
              </Suspense>
            ),
          },
          {
            path: 'finished-order',
            element: (
              <Suspense fallback={<div>Loading Finished Order...</div>}>
                <FinishedOrder />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'members',
        element: (
          <Suspense fallback={<div>Loading Members Page...</div>}>
            <MemberLoadingPage />
          </Suspense>
        ),
      },
      {
        path: '/shower-map',
        element: (
          <Suspense fallback={<div>Loading Shower Map...</div>}>
            <ShowerMapPage />
          </Suspense>
        ),
      },
      {
        path: '/wave',
        element: (
          <Suspense fallback={<div>Loading Wave Report...</div>}>
            <WaveReportPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createHashRouter(route);
export default router;
