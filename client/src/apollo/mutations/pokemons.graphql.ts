import { gql } from "@/generated/gql";

export const FAVORITE_POKEMON_MUTATION = gql(`
  mutation FavoritePokemon($favoritePokemonId: ID!) {
    favoritePokemon(id: $favoritePokemonId) {
      id
      isFavorite
      name
      image
      types
    }
  }
`);

export const UNFAVORITE_POKEMON_MUTATION = gql(`
  mutation UnfavoritePokemon($unFavoritePokemonId: ID!) {
    unFavoritePokemon(id: $unFavoritePokemonId) {
      id
      isFavorite
      name
      image
      types
    }
  }
`);
