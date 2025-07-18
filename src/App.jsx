import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import OceanFooter from './components/layout/OceanFooter';
import ScrollToTop from './pages/scrollToTop/scrollToTop';
import MessageToast from './components/message/MessageToast';

function App() {
  return (
    <>
      <ScrollToTop />
      <div id='app'>
        <Navbar />
        <MessageToast />
        <div>
          <Outlet />
        </div>
        <OceanFooter />
      </div>
    </>
  );
}

export default App;
