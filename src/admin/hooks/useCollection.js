import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * CRUD de uma tabela de lista (com coluna `position` para ordenação).
 * Todas as funções lançam erro em caso de falha — quem chama mostra o aviso.
 */
export function useCollection(table) {
  const [items, setItemsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Ref sempre atualizada: permite várias criações seguidas (envio em lote) sem posições repetidas
  const itemsRef = useRef([]);

  const setItems = useCallback((next) => {
    itemsRef.current = typeof next === 'function' ? next(itemsRef.current) : next;
    setItemsState(itemsRef.current);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase.from(table).select('*').order('position').order('created_at');
    if (err) setError(err);
    else {
      setItems(data);
      setError(null);
    }
    setLoading(false);
  }, [table, setItems]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (values) => {
      const position = itemsRef.current.reduce((max, i) => Math.max(max, i.position), -1) + 1;
      const { data, error: err } = await supabase.from(table).insert({ ...values, position }).select().single();
      if (err) throw err;
      setItems((prev) => [...prev, data]);
      return data;
    },
    [table, setItems],
  );

  const update = useCallback(
    async (id, values) => {
      const { data, error: err } = await supabase.from(table).update(values).eq('id', id).select().single();
      if (err) throw err;
      setItems((prev) => prev.map((i) => (i.id === id ? data : i)));
      return data;
    },
    [table, setItems],
  );

  const remove = useCallback(
    async (id) => {
      const { error: err } = await supabase.from(table).delete().eq('id', id);
      if (err) throw err;
      setItems((prev) => prev.filter((i) => i.id !== id));
    },
    [table, setItems],
  );

  /** Salva a nova ordem (otimista: a lista muda na hora e volta se der erro). */
  const reorder = useCallback(
    async (next) => {
      const previous = itemsRef.current;
      const withPositions = next.map((item, position) => ({ ...item, position }));
      setItems(withPositions);
      const changed = withPositions.filter((item) => previous.find((p) => p.id === item.id)?.position !== item.position);
      const results = await Promise.all(
        changed.map((item) => supabase.from(table).update({ position: item.position }).eq('id', item.id)),
      );
      const failed = results.find((r) => r.error);
      if (failed) {
        setItems(previous);
        throw failed.error;
      }
    },
    [table, setItems],
  );

  return { items, loading, error, load, create, update, remove, reorder };
}

/** Linha única de configurações (site_settings, id = 1). */
export function useSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data: row, error: err }) => {
        if (err) setError(err);
        else if (!row) setError(new Error('Configurações não encontradas. Rode o seed do banco.'));
        else setData(row);
        setLoading(false);
      });
  }, []);

  const save = useCallback(async (values) => {
    const { data: row, error: err } = await supabase.from('site_settings').update(values).eq('id', 1).select().single();
    if (err) throw err;
    setData(row);
    return row;
  }, []);

  return { data, loading, error, save };
}
