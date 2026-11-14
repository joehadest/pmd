/**
 * Perfil do administrador, guardado no próprio usuário do Supabase Auth
 * (user_metadata). Não precisa de tabela extra e vai junto no login.
 */
export function getProfile(user) {
  const meta = user?.user_metadata || {};
  const emailName = user?.email?.split('@')[0] || '';
  const fullName = (meta.full_name || '').trim();
  const nickname = (meta.nickname || '').trim();

  // Nome de exibição: apelido → primeiro nome → parte do e-mail sem números
  const fromEmail = emailName.split(/[._-]/)[0].replace(/\d+/g, '');
  const displayName = nickname || fullName.split(' ')[0] || capitalize(fromEmail) || 'Admin';

  const source = fullName || nickname || fromEmail || 'A';
  const initials = source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return {
    fullName,
    nickname,
    phone: meta.phone || '',
    role: meta.role_title || '',
    avatarUrl: meta.avatar_url || '',
    displayName,
    initials,
    email: user?.email || '',
  };
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}
