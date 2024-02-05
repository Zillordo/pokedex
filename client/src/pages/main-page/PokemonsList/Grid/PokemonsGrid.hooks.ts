import { PokemonsQuery, PokemonsQueryVariables } from "@/generated/graphql";
import { GET_POKEMONS } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import { useRef, useCallback, useEffect } from "react";

const createIntersectionObserver = (
  lastElementRef: React.RefObject<HTMLDivElement>,
  loadMore: () => void,
  data?: PokemonsQuery,
) => {
  const shouldLoadMore =
    (data?.pokemons?.edges?.length || 0) < (data?.pokemons?.count || 0);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && shouldLoadMore) {
        loadMore();
      }
    },
    { threshold: 0, rootMargin: "-100px 0px 0px 0px" },
  );

  observer.observe(lastElementRef.current!);

  return () => {
    observer.disconnect();
  };
};

export const usePaginatedPokemonQuery = ({
  search,
  filter,
}: Pick<PokemonsQueryVariables, "search" | "filter">) => {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      search,
      filter,
      limit: 30,
    },
  });

  const loadMore = useCallback(async () => {
    await fetchMore({
      variables: { offset: data?.pokemons?.edges?.length },
    });
  }, [data?.pokemons?.edges?.length, fetchMore]);

  useEffect(() => {
    if (!lastElementRef.current) return;

    return createIntersectionObserver(lastElementRef, loadMore, data);
  }, [data, loadMore, lastElementRef]);

  return { data, lastElementRef };
};
