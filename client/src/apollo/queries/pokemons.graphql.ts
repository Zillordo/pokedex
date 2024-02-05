import { gql } from "@/generated/gql";

export const GET_POKEMONS = gql(`
  query Pokemons(
    $limit: Int
    $offset: Int
    $search: String
    $filter: PokemonFilterInput
  ) {
    pokemons(limit: $limit, offset: $offset, search: $search, filter: $filter) {
      edges {
        id
        name
        image
        types
        isFavorite
      }
      limit
      offset
      count
    }
  }
`);

export const GET_POKEMON_TYPES = gql(`
  query PokemonTypes {
    pokemonTypes
  }
`);

export const GET_POKEMON_BY_ID = gql(`
  query PokemonById($pokemonById: ID!) {
    pokemonById(id: $pokemonById) {
      id
      number
      name
      sound
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        image
        name
        isFavorite
      }
      maxHP
      image
      sound
      isFavorite
    }
  }
`);
