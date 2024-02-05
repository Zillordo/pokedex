import { PokemonCard } from "@/components/PokemonCard";
import { NoData } from "@/components/NoData";
import { Link } from "@tanstack/react-router";
import { usePaginatedPokemonQuery } from "./PokemonsGrid.hooks";
import { CommonProps } from "../PokemonList.types";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PokemonsGird = ({ filter, search }: CommonProps) => {
  const { lastElementRef, data } = usePaginatedPokemonQuery({
    search,
    filter,
  });
  const listLength = data?.pokemons?.edges?.length || 0;

  if (listLength === 0) {
    return <NoData className="mt-10" message="There are no Pokemons" />;
  }

  return (
    <ScrollArea className="h-full pb-8">
      <div
        className={`grid ${listLength <= 3 ? "grid-cols-[repeat(auto-fit,minmax(200px,300px))]" : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"} gap-4`}
      >
        {data?.pokemons?.edges?.map((pokemon, index) => (
          <Link
            to="/detail/$pokemonId"
            params={{ pokemonId: pokemon.id }}
            key={pokemon.id}
            className="cursor-pointer"
          >
            <PokemonCard
              ref={index === listLength - 1 ? lastElementRef : null}
              {...pokemon}
            />
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};
