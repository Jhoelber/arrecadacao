const APP_VERSION_URL = import.meta.env.VITE_APP_VERSION_URL as string;
const KEY = "totem_app_version";

export function startAppVersionPolling(pollMs = 120_000) {
  if (!APP_VERSION_URL) return;

  const tick = async () => {
    try {
      const url = `${APP_VERSION_URL}?t=${Math.floor(Date.now() / pollMs)}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;

      const data = (await res.json()) as { version: number };
      const remote = Number(data.version ?? 0);
      const current = Number(localStorage.getItem(KEY) ?? "0");

      if (remote > current) {
        localStorage.setItem(KEY, String(remote));
        window.location.reload();
      }
    } catch {}
  };

  tick();
  setInterval(tick, pollMs);
}
