import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import OceanFooter from './components/layout/OceanFooter';

function App() {
  return (
    <>
      <div id='app'>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <OceanFooter />
      </div>
    </>
  );
}

export default App;
