import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import { FiAlertTriangle, FiLogOut } from 'react-icons/fi';
import { isSupabaseConfigured } from '../lib/supabase';
import { AuthProvider, useAuth } from './auth';
import { ConfirmProvider, Spinner } from './components/ui';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import EventPage from './pages/EventPage';
import ActivityPage from './pages/ActivityPage';
import { LineupPage, OpenBarPage, SalesPointsPage, SponsorsPage, StructurePage, TicketsPage } from './pages/content';
import { AccountPage, ForgotPasswordPage, LoginPage, ResetPasswordPage } from './pages/AuthPages';
import './admin.css';

function FullScreen({ children }) {
  return <div className="a-fullscreen">{children}</div>;
}

/** Só deixa passar quem está logado E cadastrado na tabela public.admins. */
function RequireAdmin({ children }) {
  const { status, user, signOut } = useAuth();

  if (status === 'loading') {
    return (
      <FullScreen>
        <Spinner label="Verificando acesso…" />
      </FullScreen>
    );
  }
  if (status === 'signed-out') return <Navigate to="/admin/login" replace />;
  if (status === 'not-admin') {
    return (
      <FullScreen>
        <div className="a-card a-card--narrow a-denied">
          <FiAlertTriangle className="a-denied__icon" aria-hidden="true" />
          <h1>Sem permissão de administrador</h1>
          <p>
            A conta <strong>{user?.email}</strong> entrou, mas ainda não foi liberada como administradora. Peça para quem
            gerencia o Supabase adicionar este usuário na tabela <code>admins</code>.
          </p>
          <button type="button" className="a-btn a-btn--ghost" onClick={signOut}>
            <FiLogOut /> Sair
          </button>
        </div>
      </FullScreen>
    );
  }
  return children;
}

function SetupScreen() {
  return (
    <FullScreen>
      <div className="a-card a-card--narrow a-denied">
        <FiAlertTriangle className="a-denied__icon" aria-hidden="true" />
        <h1>Supabase não configurado</h1>
        <p>
          Crie o arquivo <code>.env.local</code> (ou as variáveis de ambiente na Vercel) com{' '}
          <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> e reinicie o servidor.
        </p>
      </div>
    </FullScreen>
  );
}

export default function AdminApp() {
  return (
    <div className="admin-root">
      {!isSupabaseConfigured ? (
        <SetupScreen />
      ) : (
        <AuthProvider>
          <ConfirmProvider>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="esqueci-senha" element={<ForgotPasswordPage />} />
              <Route path="redefinir-senha" element={<ResetPasswordPage />} />
              <Route
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="evento" element={<EventPage />} />
                <Route path="lineup" element={<LineupPage />} />
                <Route path="open-bar" element={<OpenBarPage />} />
                <Route path="estrutura" element={<StructurePage />} />
                <Route path="ingressos" element={<TicketsPage />} />
                <Route path="pontos-de-venda" element={<SalesPointsPage />} />
                <Route path="patrocinadores" element={<SponsorsPage />} />
                <Route path="atividade" element={<ActivityPage />} />
                <Route path="conta" element={<AccountPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
            </Routes>
          </ConfirmProvider>
        </AuthProvider>
      )}
      <Toaster theme="dark" position="top-right" richColors closeButton toastOptions={{ className: 'a-toast' }} />
    </div>
  );
}
