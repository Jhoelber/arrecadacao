declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function norm(v: string) {
  return v
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function trackMenuClick(id: number, titulo: string, href: string) {
  const safeTitle = (titulo ?? "").trim();
  const item = safeTitle ? norm(safeTitle) : `item_${id}`;

  window.gtag?.("event", "menu_click", {
    menu_id: String(id),
    item,
    url: href,
    transport_type: "beacon",
  });
}