import { PokemonsGird } from "./Grid";
import { Props } from "./PokemonList.types";
import { PokemonsTable } from "./Table";

export const PokemonList = ({ view, ...rest }: Props) => {
  if (view === "table") {
    return <PokemonsTable {...rest} />;
  } else {
    return <PokemonsGird {...rest} />;
  }
};
