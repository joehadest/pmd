import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/inter';
import './styles/global.css';
import App from './App.jsx';

// O painel só é baixado por quem acessa /admin — o site público não fica mais pesado.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="admin-boot" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
