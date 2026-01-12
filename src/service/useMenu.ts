import { useEffect, useMemo, useState } from "react";
import { MENU_FALLBACK, type MenuItem } from "../menuFallback";

type MenuConfig = { versao: number; itens: MenuItem[] };

const STORAGE_KEY = "totem_menu_cache_v1";
const MENU_URL = import.meta.env.VITE_MENU_URL as string;

function readCache(): MenuConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MenuConfig) : null;
  } catch {
    return null;
  }
}

function writeCache(cfg: MenuConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {}
}

export function useMenu(pollMs = 120_000) {
  const cached = useMemo(() => readCache(), []);
  const [cfg, setCfg] = useState<MenuConfig>(cached ?? MENU_FALLBACK);

  async function load() {
    if (!MENU_URL) return;

    // “cache buster” leve pra reduzir chance de cache do raw
    const url = `${MENU_URL}?t=${Math.floor(Date.now() / pollMs)}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;

      const remote = (await res.json()) as MenuConfig;
      if (!remote?.itens?.length) return;

      const current = readCache() ?? cfg;
      if ((remote.versao ?? 0) >= (current.versao ?? 0)) {
        writeCache(remote);
        setCfg(remote);
      }
    } catch {}
  }

  useEffect(() => {
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollMs]);

  const itens = useMemo(
    () => [...(cfg.itens ?? [])].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
    [cfg.itens]
  );

  return { ...cfg, itens };
}
