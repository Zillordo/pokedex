import { Pokemon } from "@/generated/graphql";

export type MutationPokemon = Pick<
  Pokemon,
  "id" | "isFavorite" | "name" | "types" | "image"
>;

export type FavoritePokemonMutation = {
  favoritePokemon?: MutationPokemon;
};

export type UnfavoritePokemonMutation = {
  unFavoritePokemon?: MutationPokemon;
};
