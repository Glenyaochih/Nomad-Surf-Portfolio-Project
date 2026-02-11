import AdminIndexPage from './AdminIndexPage';
import AdminLoginPage from './AdminLoginPage';
import { useSelector } from 'react-redux';
import ScrollToTop from '../../pages/scrollToTop/scrollToTop';

export default function Admin() {
  const isLogin = useSelector((state) => state.adminAuth.isManagementPageOpen);
  return (
    <>
      <ScrollToTop />
      {isLogin ? <AdminIndexPage /> : <AdminLoginPage />}
    </>
  );
}
