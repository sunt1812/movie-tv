import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { MainLayout } from './components/layout';
import routes from './routes/routes';

import 'react-toastify/dist/ReactToastify.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './index.css';

function App() {
  return (
    <>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.element}
                  path={route.path}
                />
              ) : (
                <Route path={route.path} key={index} element={route.element} />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* app routes */}
    </>
  );
}

export default App;
