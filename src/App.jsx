import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import OceanFooter from './components/OceanFooter';

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
