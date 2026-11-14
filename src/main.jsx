import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/inter';
import './styles/global.css';
import App from './App.jsx';

// Painel admin adiado: só entra no build com VITE_ENABLE_ADMIN=true (ver README).
// Desligado, o código do painel nem é gerado e /admin mostra o site.
const ADMIN_ENABLED = import.meta.env.VITE_ENABLE_ADMIN === 'true';

// O painel só é baixado por quem acessa /admin — o site público não fica mais pesado.
const AdminApp = ADMIN_ENABLED ? lazy(() => import('./admin/AdminApp.jsx')) : null;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {AdminApp && (
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="admin-boot" />}>
                <AdminApp />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
