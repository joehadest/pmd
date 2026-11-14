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

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);

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

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, status, recovery, signIn, signOut, sendReset, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
