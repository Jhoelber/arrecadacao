const APP_VERSION_URL = import.meta.env.VITE_APP_VERSION_URL as string;
const KEY = "totem_app_version";

export function startAppVersionPolling(baseMs = 120_000) {
  if (!APP_VERSION_URL) return;

  let inFlight = false;
  let backoffMs = 0;

  const scheduleNext = () => {
    const jitter = Math.floor(Math.random() * 15_000); // 0–15s
    const wait = Math.max(baseMs + jitter, backoffMs);
    setTimeout(tick, wait);
  };

  const tick = async () => {
    if (inFlight) return scheduleNext();
    inFlight = true;

    try {
      const url = `${APP_VERSION_URL}?t=${Math.floor(Date.now() / baseMs)}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = (await res.json()) as { version: number };
      const remote = Number(data.version ?? 0);
      const current = Number(localStorage.getItem(KEY) ?? "0");

      if (remote > current) {
        localStorage.setItem(KEY, String(remote));
        window.location.reload();
        return; // não precisa agendar, vai recarregar
      }

      backoffMs = 0; // sucesso, zera backoff
    } catch {
      // backoff exponencial: 5s -> 10s -> 20s -> ... até 5 min
      backoffMs = backoffMs ? Math.min(backoffMs * 2, 300_000) : 5_000;
    } finally {
      inFlight = false;
      scheduleNext();
    }
  };

  tick(); // start
}
