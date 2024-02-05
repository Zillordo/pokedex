import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";
import {
  FavoritePokemonsArgs,
  useFavoritePokemonMutation,
} from "./FavoritePokemonButton.hooks";

type Props = FavoritePokemonsArgs;

export const FavoritePokemonButton = (props: Props) => {
  const { execute } = useFavoritePokemonMutation(props);

  const handleFavorite: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    execute();
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleFavorite}>
      <Heart className={`text-red-500 ${props.isFavorite && "fill-red-500"}`} />
    </Button>
  );
};
