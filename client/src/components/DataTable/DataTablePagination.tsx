import { Table } from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "./DataTable";

const NUMBER_OF_RENDERED_PAGINATIONS = 4;

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
} & Pick<React.ComponentProps<typeof DataTable>, "fetchNewPage">;

export function DataTablePagination<TData>({
  table,
  fetchNewPage,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const paginationItems = useMemo(
    () => Array.from(Array(pageCount).keys()),
    [pageCount],
  );
  const [renderedPaginationItems, setRenderedPaginationItems] = useState<
    number[]
  >([]);

  const shiftRenderedPaginationItems = (page: number) => {
    const lastRenderedIndex =
      renderedPaginationItems[renderedPaginationItems.length - 1];

    let start = Math.max(0, page - NUMBER_OF_RENDERED_PAGINATIONS + 2);
    let end = Math.max(page + 2, NUMBER_OF_RENDERED_PAGINATIONS);

    if (lastRenderedIndex === page) {
      start++;
      end++;
    }
    setRenderedPaginationItems(paginationItems.slice(start, end));
  };

  const handlePageClick = async (pageIndex: number) => {
    const pageSize = table.getState().pagination.pageSize;
    const prevPage = table.getState().pagination.pageIndex + 1;

    // limit: needs to be the difference between previous page size and currently selected page size (+1 to solve for 0 indexing)
    // offset: needs to be offset by the previous offset
    await fetchNewPage?.({
      limit: Math.max(0, pageSize * (pageIndex + 1 - prevPage)),
      offset: pageSize * prevPage,
    });

    table.setPageIndex(pageIndex);
    shiftRenderedPaginationItems(pageIndex);
  };

  const handleNextPage = async () => {
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex + 1;

    if (!table.getCanNextPage()) {
      return;
    }

    // limit: needs to be by a page size as we are only adding one more page
    // offset: needs to be number of items * page visited (+1 is added as we are incrementing the page by one)
    await fetchNewPage?.({
      limit: pageSize,
      offset: pageSize * pageIndex,
    });

    table.nextPage();
    shiftRenderedPaginationItems(pageIndex);
  };

  const handlePrevPage = async () => {
    const prevPage = table.getState().pagination.pageIndex;
    if (!table.getCanPreviousPage()) {
      return;
    }

    table.previousPage();
    shiftRenderedPaginationItems(prevPage - 1);
  };

  useEffect(() => {
    setRenderedPaginationItems(
      paginationItems.slice(0, NUMBER_OF_RENDERED_PAGINATIONS),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationItems]);

  return (
    <div className="flex items-center sm:justify-between align-center p-2 pt-0 sm:flex-row flex-col gap-2">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      {paginationItems.length > 1 && (
        <Pagination className="sm:justify-end justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>

            {renderedPaginationItems?.map((pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  isActive={currentPage === pageIndex}
                  onClick={() => handlePageClick(pageIndex)}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
