import { useEffect, useMemo, useRef, useState } from "react";
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

  const inFlight = useRef(false);

  async function load() {
    if (!MENU_URL || inFlight.current) return;
    inFlight.current = true;

    const url = `${MENU_URL}?t=${Math.floor(Date.now() / pollMs)}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;

      const remote = (await res.json()) as MenuConfig;
      if (!remote?.itens?.length) return;

      const current = readCache() ?? cfg;
      const remoteV = Number(remote.versao ?? 0);
      const currentV = Number(current.versao ?? 0);

      // atualiza só se mudou de verdade
      if (remoteV > currentV) {
        writeCache(remote);
        setCfg(remote);
      }
    } catch {
      // silencioso, mantém cache atual
    } finally {
      inFlight.current = false;
    }
  }

  useEffect(() => {
    load();

    const jitter = Math.floor(Math.random() * 10_000); // 0–10s
    const id = setInterval(load, pollMs + jitter);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollMs]);

  const itens = useMemo(
    () => [...(cfg.itens ?? [])].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
    [cfg.itens]
  );

  return { ...cfg, itens };
}
