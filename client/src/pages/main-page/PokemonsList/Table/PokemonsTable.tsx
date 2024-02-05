import { CommonProps } from "../PokemonList.types";
import {
  DataTable,
  useTable,
  QueryPaginationData,
} from "@/components/DataTable";
import { GET_POKEMONS } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { TablePokemonType } from "./PokemonsTable.types";
import { COLUMNS_DEF } from "./columns.config";
import { ScrollArea } from "@/components/ui/scroll-area";

const PAGE_SIZE = 6;

export const PokemonsTable = ({ search, filter }: CommonProps) => {
  const { data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { search, filter, limit: PAGE_SIZE },
  });

  const table = useTable<TablePokemonType>({
    data: data?.pokemons?.edges || [],
    columns: COLUMNS_DEF,
    totalCount: data?.pokemons?.count,
    pageSize: PAGE_SIZE,
  });

  const loadMore = useCallback(
    (pagination: QueryPaginationData) => fetchMore({ variables: pagination }),
    [fetchMore],
  );

  useEffect(() => {
    table.setPageIndex(0);
  }, [table, search, filter?.type]);

  return (
    <ScrollArea className="flex flex-col h-full pb-8 overflow-auto">
      <DataTable
        table={table}
        fetchNewPage={loadMore}
        columnsLength={COLUMNS_DEF.length}
      />
    </ScrollArea>
  );
};
