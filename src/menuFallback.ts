export type MenuItem = {
  id: number;
  ordem: number;
  titulo: string;
  descricao?: string;
  imgUrl: string;
  href: string;
  target?: "_self" | "_blank";
};

export type MenuConfig = {
  versao: number;
  itens: MenuItem[];
};

export const MENU_FALLBACK: MenuConfig = {
  versao: 0,
  itens: [
    {
      id: 1,
      ordem: 1,
      titulo: "Exemplo (fallback)",
      descricao: "Problema ao carregar.",
      imgUrl: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1739365393/images/Estadual.png",
      href: "https://google.com",
      target: "_self",
    },
  ],
};
