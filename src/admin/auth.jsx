import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

/**
 * Sessão do Supabase + verificação de administrador (tabela public.admins).
 * status: 'loading' | 'signed-out' | 'not-admin' | 'admin'
 */
export function AuthProvider({ children }) {
  // undefined = ainda verificando; null = sem sessão
  const [session, setSession] = useState(undefined);
  const [status, setStatus] = useState('loading');
  const sessionKey = session === undefined ? 'loading' : (session?.user?.id ?? 'none');
  const [recovery, setRecovery] = useState(false);
  const [expired, setExpired] = useState(false);

  /**
   * Confere no servidor se a sessão salva no navegador ainda vale. Ela pode ter
   * sido encerrada em outro lugar (troca de senha, "sair de todos os aparelhos").
   * Se não valer mais, sai localmente e marca como expirada para o login avisar.
   */
  const validateSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return false;
    const { error } = await supabase.auth.getUser();
    if (!error) return true;
    setExpired(true);
    await supabase.auth.signOut({ scope: 'local' });
    return false;
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session && !(await validateSession())) return;
      setSession(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      if (event === 'SIGNED_IN') setExpired(false);
      setSession(next);
    });
    // Ao voltar para a aba, revalida (a sessão pode ter caído enquanto isso)
    const onVisible = () => document.visibilityState === 'visible' && validateSession();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      data.subscription.unsubscribe();
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [validateSession]);

  useEffect(() => {
    let cancelled = false;
    if (sessionKey === 'loading') return;
    if (sessionKey === 'none') {
      setStatus('signed-out');
      return;
    }
    setStatus('loading');
    supabase.rpc('is_admin').then(({ data, error }) => {
      if (cancelled) return;
      setStatus(!error && data ? 'admin' : 'not-admin');
    });
    return () => {
      cancelled = true;
    };
  }, [sessionKey]);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

  const sendReset = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/redefinir-senha`,
    });
    if (error) throw error;
  }, []);

  const updatePassword = useCallback(async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    setRecovery(false);
  }, []);

  /** Salva nome, apelido, foto etc. no perfil (user_metadata) e renova o token. */
  const updateProfile = useCallback(async (data) => {
    if (!(await validateSession())) throw new Error('Sua sessão expirou. Entre novamente.');
    const { data: result, error } = await supabase.auth.updateUser({ data });
    if (error) throw error;
    // O token novo leva o apelido para o histórico de atividades
    await supabase.auth.refreshSession();
    return result.user;
  }, [validateSession]);

  /** Encerra a sessão em todos os aparelhos (útil se esqueceu logado em outro lugar). */
  const signOutEverywhere = useCallback(() => supabase.auth.signOut({ scope: 'global' }), []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        status,
        recovery,
        expired,
        signIn,
        signOut,
        signOutEverywhere,
        sendReset,
        updatePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
