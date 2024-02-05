import { PokemonsQueryVariables } from "@/generated/graphql";

export type CommonProps = Pick<PokemonsQueryVariables, "search" | "filter">;

export type Props = { view: "table" | "grid" } & CommonProps;
