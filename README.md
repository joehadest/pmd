# Camarote PMD 2026 — Site + painel admin

Site oficial do Camarote PMD no Alto Folia 2026 (Alto do Rodrigues/RN), do Bloco **Pode Mangar Deu** ([@podemangardeu](https://instagram.com/podemangardeu)), com painel administrativo em **/admin** para editar todo o conteúdo sem mexer no código.

## Stack

- **React 19** + **Vite 8** + **React Router 7**
- **Supabase**: banco Postgres, login, armazenamento de imagens e regras de segurança (RLS)
- CSS moderno sem framework: `@layer`, nesting nativo, `clamp()`, `:has()`, scroll-driven animations, `<dialog>` nativo
- Fontes self-hosted via Fontsource (**Unbounded** e **Inter**), ícones `react-icons`
- Painel: `@dnd-kit` (arrastar para reordenar) e `sonner` (avisos)

## Comandos

```bash
npm install        # instala dependências (Node 20.19+)
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção em dist/
npm run preview    # testa o build localmente
npm run images     # regenera as imagens otimizadas de public/img
```

## Painel admin (/admin)

| Página | O que edita |
|---|---|
| Visão geral | Resumo, contadores, seções visíveis e últimas alterações |
| Evento e textos | Nome, datas, local, textos do topo, vídeo, contatos, Pousada, rodapé e **ligar/desligar seções** |
| Line-up | Atrações (cartaz, nome, horário, confirmado/em breve) |
| Open Bar | Cartaz e lista de bebidas |
| Estrutura | Galeria de fotos (envio de várias de uma vez) |
| Ingressos | Lote atual, validade, link de vendas e tipos de ingresso (preço, benefícios, destaque) |
| Pontos de venda | Lojas agrupadas por cidade |
| Patrocinadores | Logos, com ajuste de tamanho e prévia |
| Atividade | Histórico de quem alterou o quê |
| Minha conta | Troca de senha |

Em todas as listas dá para **arrastar para reordenar**, **ocultar sem excluir**, buscar, editar e excluir. Imagens enviadas são **redimensionadas e convertidas para WebP no navegador** antes do upload (logos também têm a borda transparente recortada).

### Como o site usa o banco

O site carrega o conteúdo do Supabase ao abrir. Enquanto carrega — ou se o banco estiver fora do ar — ele mostra a última versão salva no navegador ou o conteúdo padrão de `src/data/site.js`. Ou seja, o site nunca fica em branco.

### Configuração (uma vez)

1. **Variáveis de ambiente** — copie `.env.example` para `.env.local` e preencha a *publishable key* (Supabase → Project Settings → API). Cadastre as mesmas variáveis na Vercel.
2. **Banco** — rode, nesta ordem, no SQL Editor do Supabase (ou pelo MCP do Supabase):
   - `supabase/migrations/20261114120000_painel_admin.sql` — tabelas, segurança, bucket de imagens e log
   - `supabase/seed.sql` — conteúdo atual do site
3. **Primeiro administrador** — em Authentication → Users, crie o usuário (e-mail + senha) e depois rode:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'seu-email@exemplo.com';
   ```

4. Recomendado: em Authentication → Sign In / Providers, **desative "Allow new users to sign up"** — o acesso ao painel já depende da tabela `admins`, mas assim ninguém cria conta à toa. Em Authentication → URL Configuration, adicione `https://SEU-DOMINIO/admin/redefinir-senha` às Redirect URLs (recuperação de senha).

### Segurança

- Leitura pública só do que está **ativo**; escrita só para quem está na tabela `admins` (RLS em todas as tabelas e no bucket `site-media`).
- A *publishable key* pode ficar no front-end. **Nunca** coloque a `service_role`/secret key no projeto.

## Imagens fixas do site

Selo, imagens iniciais e vídeo ficam em `public/`. Para regenerar as versões otimizadas a partir dos originais em `assets/source/`, rode `npm run images`. Conteúdo novo deve ser enviado pelo painel.

## Estrutura

```
supabase/migrations/   esquema do banco (tabelas, RLS, storage, log)
supabase/seed.sql      conteúdo inicial
src/data/site.js       conteúdo padrão + conversão dos dados do banco
src/content/           carregamento do conteúdo (Supabase + cache + reserva)
src/components/        seções do site
src/admin/             painel admin (páginas, componentes, upload de mídia)
src/styles/global.css  design system do site
assets/source/         imagens originais (não vão para o site)
```

## Deploy

Vercel (`vercel.json` com cache longo para assets e reescrita de rotas para o `/admin` funcionar ao recarregar). Lembre de cadastrar `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` nas variáveis de ambiente do projeto.

---

© 2026 Pode Mangar Deu. Todos os direitos reservados.
