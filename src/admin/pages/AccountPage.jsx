import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiClock,
  FiLogOut,
  FiMail,
  FiMonitor,
  FiRotateCcw,
  FiShield,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';
import { toast } from 'sonner';
import { useAuth } from '../auth';
import { getProfile } from '../lib/profile';
import { removeImage, uploadImage } from '../lib/media';
import { Avatar, Card, Field, PageHeader, Spinner, useConfirm } from '../components/ui';
import { PasswordForm } from './AuthPages';
import { timeAgo } from './ActivityPage';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
};

const longDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

/** Cabeçalho do perfil: capa com a arte PMD, foto (com troca) e dados principais. */
function ProfileHero({ user, profile }) {
  const { updateProfile } = useAuth();
  const confirm = useConfirm();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const changePhoto = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Escolha uma imagem (JPG, PNG ou WebP).');
    setBusy(true);
    try {
      const url = await uploadImage(file, { folder: 'avatars', preset: 'avatar' });
      const old = profile.avatarUrl;
      await updateProfile({ avatar_url: url });
      await removeImage(old);
      toast.success('Foto de perfil atualizada.');
    } catch (err) {
      toast.error(`Não foi possível trocar a foto: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = async () => {
    const ok = await confirm({
      title: 'Remover foto de perfil?',
      message: 'Suas iniciais vão aparecer no lugar da foto.',
      confirmLabel: 'Remover',
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    try {
      const old = profile.avatarUrl;
      await updateProfile({ avatar_url: '' });
      await removeImage(old);
      toast.success('Foto removida.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="a-card a-profile">
      <div className="a-profile__cover" aria-hidden="true" />
      <div className="a-profile__main">
        <div className="a-profile__photo">
          <Avatar profile={profile} size={104} />
          {busy && (
            <span className="a-profile__busy">
              <Spinner />
            </span>
          )}
          <button
            type="button"
            className="a-profile__camera"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            aria-label="Trocar foto de perfil"
            title="Trocar foto"
          >
            <FiCamera />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              changePhoto(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>

        <div className="a-profile__id">
          <h2>{profile.fullName || profile.displayName}</h2>
          <p>
            {profile.nickname && <span>@{profile.nickname.toLowerCase().replace(/\s+/g, '')}</span>}
            <span>{profile.email}</span>
          </p>
          <div className="a-profile__badges">
            <span className="a-badge a-badge--gold">
              <FiShield aria-hidden="true" /> Administrador
            </span>
            {profile.role && (
              <span className="a-badge">
                <FiBriefcase aria-hidden="true" /> {profile.role}
              </span>
            )}
          </div>
        </div>

        {profile.avatarUrl && (
          <button type="button" className="a-btn a-btn--ghost a-btn--sm a-btn--danger-text a-profile__remove" onClick={removePhoto} disabled={busy}>
            <FiTrash2 /> Remover foto
          </button>
        )}
      </div>

      <dl className="a-profile__facts">
        <div>
          <dt>
            <FiCalendar aria-hidden="true" /> No painel desde
          </dt>
          <dd>{longDate(user?.created_at)}</dd>
        </div>
        <div>
          <dt>
            <FiClock aria-hidden="true" /> Último acesso
          </dt>
          <dd>{user?.last_sign_in_at ? timeAgo(user.last_sign_in_at) : '—'}</dd>
        </div>
        <div>
          <dt>
            <FiMail aria-hidden="true" /> E-mail de acesso
          </dt>
          <dd>{profile.email}</dd>
        </div>
      </dl>
    </section>
  );
}

/** Dados pessoais: mesmo padrão dos outros formulários (barra aparece ao alterar). */
function ProfileForm({ profile }) {
  const { updateProfile } = useAuth();
  const initial = useMemo(
    () => ({ full_name: profile.fullName, nickname: profile.nickname, phone: profile.phone, role_title: profile.role }),
    [profile.fullName, profile.nickname, profile.phone, profile.role],
  );
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => setValues(initial), [initial]);

  const dirty = Object.keys(initial).some((k) => (values[k] || '') !== (initial[k] || ''));
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, (v || '').trim()]));
      await updateProfile(clean);
      toast.success('Perfil atualizado.');
    } catch (err) {
      toast.error(`Não foi possível salvar: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Dados pessoais" description="Como você aparece no painel e no histórico de alterações." className={dirty ? 'a-card--dirty' : ''}>
      <form id="profile-form" className="a-form" onSubmit={save}>
        <Field label="Nome completo" htmlFor="p-name" full>
          <input id="p-name" className="a-input" value={values.full_name} onChange={set('full_name')} placeholder="Ex.: Joel Melo" autoComplete="name" />
        </Field>
        <Field label="Apelido" htmlFor="p-nick" hint="Usado na saudação, no menu e no histórico.">
          <input id="p-nick" className="a-input" value={values.nickname} onChange={set('nickname')} placeholder="Ex.: Joel" maxLength={24} />
        </Field>
        <Field label="Telefone / WhatsApp" htmlFor="p-phone" hint="Opcional. Só para contato interno da equipe.">
          <input id="p-phone" className="a-input" type="tel" value={values.phone} onChange={set('phone')} placeholder="(84) 99999-9999" autoComplete="tel" />
        </Field>
        <Field label="Função na equipe" htmlFor="p-role" full hint="Opcional. Ex.: Organização, Comercial.">
          <input id="p-role" className="a-input" value={values.role_title} onChange={set('role_title')} placeholder="Ex.: Organização" maxLength={40} />
        </Field>
      </form>
      {(dirty || saving) && (
        <footer className="a-card__foot">
          <span className="a-card__status">Alterações não salvas</span>
          <button type="button" className="a-btn a-btn--ghost" onClick={() => setValues(initial)} disabled={saving}>
            <FiRotateCcw /> Desfazer
          </button>
          <button type="submit" form="profile-form" className="a-btn a-btn--primary" disabled={saving}>
            {saving ? <Spinner /> : <FiCheck />} Salvar
          </button>
        </footer>
      )}
    </Card>
  );
}

/** Mostra como o perfil aparece nos outros lugares do painel. */
function ProfilePreview({ profile }) {
  return (
    <Card title="Como você aparece" description="Atualiza na hora quando você salva.">
      <div className="a-preview">
        <div className="a-preview__item">
          <span className="a-preview__label">Menu lateral</span>
          <div className="a-user a-user--static">
            <Avatar profile={profile} />
            <span className="a-user__text">
              <strong>{profile.displayName}</strong>
              <small>{profile.role || profile.email}</small>
            </span>
          </div>
        </div>
        <div className="a-preview__item">
          <span className="a-preview__label">Visão geral</span>
          <p className="a-preview__greeting">{greeting()}, {profile.displayName}!</p>
        </div>
        <div className="a-preview__item">
          <span className="a-preview__label">Histórico</span>
          <p className="a-preview__log">
            <strong>{profile.displayName}</strong> editou <em>“Banda Pretta”</em> em <strong>Line-up</strong>
          </p>
        </div>
      </div>
    </Card>
  );
}

function SessionsCard() {
  const { signOut, signOutEverywhere } = useAuth();
  const confirm = useConfirm();

  const everywhere = async () => {
    const ok = await confirm({
      title: 'Sair de todos os aparelhos?',
      message: 'Você será desconectado deste e de qualquer outro computador ou celular onde o painel esteja aberto.',
      confirmLabel: 'Sair de todos',
      danger: true,
    });
    if (ok) await signOutEverywhere();
  };

  return (
    <Card title="Sessões" description="Esqueceu o painel aberto em outro computador? Encerre o acesso por aqui.">
      <div className="a-sessions">
        <button type="button" className="a-btn a-btn--ghost" onClick={signOut}>
          <FiLogOut /> Sair deste aparelho
        </button>
        <button type="button" className="a-btn a-btn--ghost a-btn--danger-text" onClick={everywhere}>
          <FiMonitor /> Sair de todos os aparelhos
        </button>
      </div>
    </Card>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const profile = getProfile(user);

  return (
    <div className="a-page">
      <PageHeader icon={FiUser} title="Minha conta" description="Seu perfil e a segurança do seu acesso ao painel." />

      <ProfileHero user={user} profile={profile} />

      <div className="a-columns">
        <div className="a-stack">
          <ProfileForm profile={profile} />
          <Card title="Alterar senha" description="Use pelo menos 8 caracteres. A nova senha vale a partir do próximo login.">
            <PasswordForm />
          </Card>
        </div>
        <div className="a-stack">
          <ProfilePreview profile={profile} />
          <SessionsCard />
        </div>
      </div>
    </div>
  );
}
