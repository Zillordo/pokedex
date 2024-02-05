/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation FavoritePokemon($favoritePokemonId: ID!) {\n    favoritePokemon(id: $favoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n": types.FavoritePokemonDocument,
    "\n  mutation UnfavoritePokemon($unFavoritePokemonId: ID!) {\n    unFavoritePokemon(id: $unFavoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n": types.UnfavoritePokemonDocument,
    "\n  query Pokemons(\n    $limit: Int\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n      limit\n      offset\n      count\n    }\n  }\n": types.PokemonsDocument,
    "\n  query PokemonTypes {\n    pokemonTypes\n  }\n": types.PokemonTypesDocument,
    "\n  query PokemonById($pokemonById: ID!) {\n    pokemonById(id: $pokemonById) {\n      id\n      number\n      name\n      sound\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        image\n        name\n        isFavorite\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n": types.PokemonByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation FavoritePokemon($favoritePokemonId: ID!) {\n    favoritePokemon(id: $favoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n"): (typeof documents)["\n  mutation FavoritePokemon($favoritePokemonId: ID!) {\n    favoritePokemon(id: $favoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UnfavoritePokemon($unFavoritePokemonId: ID!) {\n    unFavoritePokemon(id: $unFavoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n"): (typeof documents)["\n  mutation UnfavoritePokemon($unFavoritePokemonId: ID!) {\n    unFavoritePokemon(id: $unFavoritePokemonId) {\n      id\n      isFavorite\n      name\n      image\n      types\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Pokemons(\n    $limit: Int\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n      limit\n      offset\n      count\n    }\n  }\n"): (typeof documents)["\n  query Pokemons(\n    $limit: Int\n    $offset: Int\n    $search: String\n    $filter: PokemonFilterInput\n  ) {\n    pokemons(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n      limit\n      offset\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PokemonTypes {\n    pokemonTypes\n  }\n"): (typeof documents)["\n  query PokemonTypes {\n    pokemonTypes\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PokemonById($pokemonById: ID!) {\n    pokemonById(id: $pokemonById) {\n      id\n      number\n      name\n      sound\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        image\n        name\n        isFavorite\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  query PokemonById($pokemonById: ID!) {\n    pokemonById(id: $pokemonById) {\n      id\n      number\n      name\n      sound\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      classification\n      types\n      resistant\n      weaknesses\n      fleeRate\n      maxCP\n      evolutions {\n        id\n        image\n        name\n        isFavorite\n      }\n      maxHP\n      image\n      sound\n      isFavorite\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;