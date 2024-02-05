import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { useQuery } from "@apollo/client";
import { DetailsCard } from "./DetailsCard";
import { Evolutions } from "./Evolutions";
import { GET_POKEMON_BY_ID } from "@/apollo/queries";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  pokemonId: string;
};

export const DetailPage = ({ pokemonId }: Props) => {
  const { data } = useQuery(GET_POKEMON_BY_ID, {
    variables: {
      pokemonById: pokemonId,
    },
  });

  if (!data?.pokemonById) {
    return null;
  }

  const pokemon = data.pokemonById;

  return (
    <ScrollArea className="h-full">
      <div className="w-full pb-4 flex gap-3 items-center">
        <Link to="/">
          <Button size="icon" variant="outline">
            <ArrowLeft className="w-[20px] h-[20px]" />
          </Button>
        </Link>
        <h2 className="font-semibold">Go Back To List</h2>
      </div>
      <div className="grid md:grid-cols-[1.2fr_1fr] grid-cols-1 grid-rows-[auto_auto] md:grid-rows-1 gap-5 pb-4 w-full">
        <div className="">
          <PokemonCard {...pokemon} />
        </div>
        <div className="flex justify-between flex-col lg:gap-4 gap-3 h-fit">
          <DetailsCard
            {...pokemon}
            className="flex-[0.5]"
            evolutionsNumber={pokemon.evolutions?.length}
          />
          <Evolutions className="px-9 md:px-3" {...pokemon} />
        </div>
      </div>
    </ScrollArea>
  );
};
