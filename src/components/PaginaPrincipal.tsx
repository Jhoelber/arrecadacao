import { useMenu } from "../service/useMenu";
import { Topo } from "./Topo";

export function PaginaPrincipal() {
    const { itens } = useMenu(120_000);

    return (

        <div>
            <Topo/>
            <main className="grid grid-cols-1 gap-y-16 gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3 mt-10">
                {itens.map((item) => (
                    <a key={item.id} href={item.href} className="w-64 p-4 ">
                        <div className="flex flex-col items-center gap-3 ">
                            <img
                                src={item.imgUrl}
                                alt={item.titulo}
                                loading="lazy"
                                decoding="async"
                                className="h-auto w-48 object-contain"
                            />
                            <div className="text-center">
                                <div className="text-sm font-medium">{item.titulo}

                                </div>
                                {item.descricao && <div className="text-xs text-zinc-500 ">{item.descricao}</div>}
                            </div>
                        </div>
                    </a>
                ))}
            </main>
        </div>
    );
}