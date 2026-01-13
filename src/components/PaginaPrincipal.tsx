import { useMenu } from "../service/useMenu";
import { Topo } from "./Topo";

export function PaginaPrincipal() {
  const { itens } = useMenu(120_000);

  const total = itens.length;
  const restoLg = total % 3; // porque no lg você tem 3 colunas

  return (
    <div>
      <Topo />

      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10 place-items-center">
        {itens.map((item, index) => {
        
          const empurrarProMeio =
            restoLg === 1 && index === total - 1 ? "lg:col-start-2" : "";

         
          const empurrarParProMeio =
            restoLg === 2 && index === total - 2 ? "lg:col-start-2" : "";

          return (
            <a
              key={item.id}
              href={item.href}
              className={`w-64 ${empurrarProMeio} ${empurrarParProMeio}`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-40 w-56 flex items-center justify-center">
                  <img
                    src={item.imgUrl}
                    alt={item.titulo}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="text-center min-h-11 flex items-center justify-center">
                  <div className="text-xl font-medium">{item.titulo}</div>
                </div>
              </div>
            </a>
          );
        })}
      </main>
    </div>
  );
}
