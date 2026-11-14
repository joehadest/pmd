import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { FiArrowLeft, FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { toast } from 'sonner';
import { useAuth } from '../auth';
import { Card, PageHeader, Spinner } from '../components/ui';

/** Moldura das telas de acesso: arte da marca + formulário. */
function AuthShell({ title, subtitle, children }) {
  useEffect(() => {
    document.title = `${title} · Painel Camarote PMD`;
  }, [title]);

  return (
    <div className="a-auth">
      <aside className="a-auth__art" aria-hidden="true">
        {/* Raios dentro do selo: o centro deles é sempre o centro do logo */}
        <div className="a-auth__seal">
          <div className="a-auth__rays" />
          <img src="/img/brand/selo-pmd-2026-640.webp" alt="" />
        </div>
        <p>Painel de conteúdo</p>
      </aside>
      <main className="a-auth__main">
        <div className="a-auth__box">
          <img className="a-auth__logo" src="/img/brand/selo-pmd-2026-320.webp" alt="Camarote PMD" />
          <h1>{title}</h1>
          {subtitle && <p className="a-auth__sub">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}

export function LoginPage() {
  const { status, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (status === 'admin') return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Entrar no painel" subtitle="Acesso restrito à equipe do Camarote PMD.">
      <form className="a-auth__form" onSubmit={submit}>
        <label className="a-auth__input">
          <FiMail aria-hidden="true" />
          <input
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="E-mail"
          />
        </label>
        <label className="a-auth__input">
          <FiLock aria-hidden="true" />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Senha"
          />
        </label>
        {error && (
          <p className="a-auth__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="a-btn a-btn--primary a-btn--lg" disabled={busy}>
          {busy ? <Spinner /> : <FiLogIn />} Entrar
        </button>
        <Link to="/admin/esqueci-senha" className="a-auth__link">
          Esqueci minha senha
        </Link>
      </form>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  const { sendReset } = useAuth();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await sendReset(email.trim());
      setSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle={sent ? 'Se o e-mail estiver cadastrado, você vai receber um link para criar uma nova senha.' : 'Informe seu e-mail de acesso.'}
    >
      {!sent && (
        <form className="a-auth__form" onSubmit={submit}>
          <label className="a-auth__input">
            <FiMail aria-hidden="true" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="E-mail" />
          </label>
          <button type="submit" className="a-btn a-btn--primary a-btn--lg" disabled={busy}>
            {busy ? <Spinner /> : <FiMail />} Enviar link
          </button>
        </form>
      )}
      <Link to="/admin/login" className="a-auth__link">
        <FiArrowLeft /> Voltar para o login
      </Link>
    </AuthShell>
  );
}

/** Formulário de nova senha (link de recuperação e página "Minha conta"). */
function PasswordForm({ onDone }) {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return toast.error('Use pelo menos 8 caracteres.');
    if (password !== confirm) return toast.error('As senhas não conferem.');
    setBusy(true);
    try {
      await updatePassword(password);
      toast.success('Senha atualizada.');
      setPassword('');
      setConfirm('');
      onDone?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="a-auth__form" onSubmit={submit}>
      <label className="a-auth__input">
        <FiLock aria-hidden="true" />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Nova senha (mín. 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Nova senha"
        />
      </label>
      <label className="a-auth__input">
        <FiLock aria-hidden="true" />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Repita a nova senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          aria-label="Repita a nova senha"
        />
      </label>
      <button type="submit" className="a-btn a-btn--primary a-btn--lg" disabled={busy}>
        {busy ? <Spinner /> : <FiLock />} Salvar nova senha
      </button>
    </form>
  );
}

export function ResetPasswordPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  return (
    <AuthShell title="Nova senha" subtitle={session ? 'Escolha uma nova senha de acesso.' : 'Abra esta página pelo link enviado ao seu e-mail.'}>
      {session ? <PasswordForm onDone={() => navigate('/admin', { replace: true })} /> : null}
      <Link to="/admin/login" className="a-auth__link">
        <FiArrowLeft /> Voltar para o login
      </Link>
    </AuthShell>
  );
}

export function AccountPage() {
  const { user } = useAuth();
  return (
    <div className="a-page">
      <PageHeader icon={FiLock} title="Minha conta" description={user?.email} />
      <Card title="Alterar senha" description="Depois de salvar, use a nova senha no próximo login." className="a-card--narrow">
        <PasswordForm />
      </Card>
    </div>
  );
}
