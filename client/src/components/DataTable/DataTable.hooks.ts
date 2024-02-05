import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

type TableOptions<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  totalCount?: number;
  pageSize: number;
};

export const useTable = <TData>({
  data,
  columns,
  totalCount,
  pageSize,
}: TableOptions<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil((totalCount || 0) / pageSize),
    autoResetPageIndex: false,
    autoResetAll: false,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return table;
};
