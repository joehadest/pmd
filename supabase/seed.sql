-- =============================================================================
-- Conteúdo inicial: exatamente o que o site mostra hoje.
-- Seguro para rodar mais de uma vez (só insere se a tabela estiver vazia).
-- =============================================================================

insert into public.site_settings (
  id, event_name, edition, organizer, date_label, date_short, date_days, city, state,
  hero_title_1, hero_title_2, hero_lead,
  tickets_url, tickets_url_label, tickets_subtitle, batch_label, batch_validity,
  video_url, openbar_poster_url,
  instagram_handle, instagram_url, commercial_phone, commercial_message,
  pousada_phone, pousada_phone_display, footer_about
) values (
  1, 'Camarote PMD 2026', 'Alto Folia 2026', 'Bloco Pode Mangar Deu',
  '28 e 29 de março', '28 & 29/03', 'Sábado e Domingo', 'Alto do Rodrigues', 'RN',
  'Camarote', 'PMD 2026',
  'Uma nova estrutura, pensada em cada detalhe, para oferecer ainda mais conforto, segurança e uma experiência inesquecível aos nossos foliões.',
  'https://outgo.com.br/camarotepmd2026', 'outgo.com.br/camarotepmd2026',
  'As primeiras vendas do bloco já encerraram! Agora vamos para uma nova etapa.',
  '1º lote liberado', 'Lote válido até 05 de março ou enquanto durar.',
  '/video/pmd-experiencia.mp4', '/img/openbar/open-bar-camarote-pmd-2026-1080.webp',
  '@podemangardeu', 'https://instagram.com/podemangardeu',
  '558496454229', 'Olá, gostaria de saber mais sobre parcerias com o Camarote PMD.',
  '558435232356', '(84) 3523-2356',
  'Desde 2007 o Bloco Pode Mangar Deu faz parte da história do Alto Folia. Em 2026, um novo capítulo: o Camarote PMD.'
)
on conflict (id) do nothing;

insert into public.artists (name, image_url, position)
select v.name, v.image_url, v.position
from (values
  ('Banda Pretta',   '/img/lineup/banda-preta-480.webp',    0),
  ('Jeff Costa',     '/img/lineup/jeff-costa-480.webp',     1),
  ('Lucas Boquinha', '/img/lineup/lucas-boquinha-480.webp', 2),
  ('JP Forrozado',   '/img/lineup/jp-forrozado-480.webp',   3),
  ('PK',             '/img/lineup/pk-480.webp',             4),
  ('Oz Piraz',       '/img/lineup/oz-piraz-480.webp',       5),
  ('DJ Guilherme',   '/img/lineup/dj-guilherme-480.webp',   6),
  ('DJ Ironside',    '/img/lineup/dj-ironside-480.webp',    7),
  ('Livia Souza',    '/img/lineup/livia-souza-480.webp',    8)
) as v (name, image_url, position)
where not exists (select 1 from public.artists);

insert into public.openbar_items (title, detail, position)
select v.title, v.detail, v.position
from (values
  ('Budweiser e Brahma Chopp', 'Open de cerveja', 0),
  ('Skol Beats',               '600 litros',      1),
  ('Vodka Smirnoff',           'Open de vodka',   2),
  ('Suco da Confusão',         '200 litros',      3),
  ('Refrigerante e água',      'Open liberado',   4)
) as v (title, detail, position)
where not exists (select 1 from public.openbar_items);

insert into public.structure_photos (image_url, alt, position)
select '/img/estrutura/camarote-' || n || '-800.webp',
       'Projeto da estrutura do Camarote PMD — vista ' || n,
       n - 1
from generate_series(1, 8) as n
where not exists (select 1 from public.structure_photos);

insert into public.ticket_types (name, people_label, price, per_person, featured, perks, position)
select v.name, v.people_label, v.price, v.per_person, v.featured, v.perks, v.position
from (values
  ('Casadinha', '2 pessoas · Sábado e Domingo', 420::numeric, 210::numeric, true,
   array['2 abadás oficiais do Bloco PMD', '2 dias de Open Bar', 'Atrações exclusivas', 'Segurança privada', 'Vista privilegiada dos trios'], 0),
  ('Individual', '1 pessoa · Sábado e Domingo', 250::numeric, null::numeric, false,
   array['1 abadá oficial do Bloco PMD', '2 dias de Open Bar', 'Atrações exclusivas', 'Segurança privada', 'Vista privilegiada dos trios'], 1)
) as v (name, people_label, price, per_person, featured, perks, position)
where not exists (select 1 from public.ticket_types);

insert into public.sales_points (city, name, address, hours, position)
select v.city, v.name, v.address, v.hours, v.position
from (values
  ('Alto do Rodrigues', 'Loja PMD',         'Av. Angelo Varela, 815',     '9h às 12h · 15h às 18h', 0),
  ('Alto do Rodrigues', 'DiskGela',         'Av. Angelo Varela, 824',     'Ter. a Sáb. · 18h às 0h', 1),
  ('Alto do Rodrigues', 'Boutique de Luxo', 'Av. Angelo Varela, 425',     '9h às 12h · 15h às 18h', 2),
  ('Macau',             'Malu Store',       'Rua Martins Ferreira, 401',  '9h às 12h',              3)
) as v (city, name, address, hours, position)
where not exists (select 1 from public.sales_points);

insert into public.sponsors (name, logo_url, scale, position)
select v.name, '/img/patrocinadores/' || v.logo || '.webp', v.scale, v.position
from (values
  ('Delta Construções & Serviços', 'delta',             1.00, 0),
  ('DaCasa',                       'dacasa',            1.00, 1),
  ('Sol Maxi',                     'sol-maxi',          1.50, 2),
  ('Baracho',                      'baracho',           1.00, 3),
  ('Disk Gela',                    'diskgela',          1.00, 4),
  ('Viva',                         'viva',              1.00, 5),
  ('iTudo',                        'itudo',             1.00, 6),
  ('Ultranet',                     'ultranet-vertical', 1.00, 7),
  ('Supercola',                    'supercola',         1.00, 8),
  ('Arena',                        'arena',             1.00, 9),
  ('AutoMais',                     'automais',          1.00, 10),
  ('MasterMais',                   'mastermais',        1.25, 11),
  ('Pousada Central',              'pousada-central',   1.00, 12)
) as v (name, logo, scale, position)
where not exists (select 1 from public.sponsors);
