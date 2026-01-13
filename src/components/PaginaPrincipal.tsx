import { useMenu } from "../service/useMenu";
import { Topo } from "./Topo";

export function PaginaPrincipal() {
  const { itens } = useMenu(120_000);

  return (
    <div>
      <Topo />

      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10 place-items-center">
        {itens.map((item) => (
          <a key={item.id} href={item.href} className="w-64 p-4">
            <div className="flex flex-col items-center gap-3">
              {/* Área fixa da imagem (garante alinhamento do texto) */}
              <div className="h-32 w-32 flex items-center justify-center">
                <img
                  src={item.imgUrl}
                  alt={item.titulo}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Área do título com altura reservada */}
              <div className="text-center min-h-11 flex items-center">
                <div className="text-xl font-medium  line-clamp-2">
                  {item.titulo}
                </div>
              </div>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
}
