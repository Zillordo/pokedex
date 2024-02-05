import { Pokemon } from "@/generated/graphql";

export type TablePokemonType = Pick<
  Pokemon,
  "id" | "name" | "image" | "types" | "isFavorite"
>;
