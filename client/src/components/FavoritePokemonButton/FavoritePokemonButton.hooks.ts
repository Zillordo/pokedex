import {
  FAVORITE_POKEMON_MUTATION,
  UNFAVORITE_POKEMON_MUTATION,
} from "@/apollo/mutations";
import {
  ApolloCache,
  ApolloError,
  Reference,
  useMutation,
} from "@apollo/client";
import { toast } from "sonner";
import { Pokemon } from "@/generated/graphql";
import {
  FavoritePokemonMutation,
  MutationPokemon,
  UnfavoritePokemonMutation,
} from "./FavoritePokemonButton.type";

const updateIsFavorite = (
  cache: ApolloCache<unknown>,
  data?: MutationPokemon,
) => {
  if (!data) return;

  cache.modify({
    fields: {
      pokemons(existing = {}, { storeFieldName, readField }) {
        if (storeFieldName.includes('"isFavorite":true')) {
          if (data?.isFavorite === false) {
            return {
              ...existing,
              count: existing.count - 1,
              edges: existing?.edges.filter(
                (ref: Reference) => readField("id", ref) !== data?.id,
              ),
            };
          }

          cache.evict({ fieldName: storeFieldName });
          return existing;
        }
        return existing;
      },
    },
  });

  cache.modify({
    id: cache.identify(data),
    fields: {
      isFavorite() {
        return data?.isFavorite;
      },
    },
  });
};

const handleError = (error: unknown) => {
  if (error instanceof ApolloError) {
    if (error.networkError) {
      console.error("Network error", error.networkError);
      toast.error(`Network error: ${error.networkError.message}`);
    } else if (error.graphQLErrors) {
      error.graphQLErrors.forEach((graphQLError) => {
        console.error("GraphQL error", graphQLError);
        toast.error(`API Error: ${graphQLError.message}`);
      });
    }
  } else {
    console.error("Other error", error);
    toast.error("Oops! Something went wrong!");
  }
};

export type FavoritePokemonsArgs = Pick<Pokemon, "id" | "name" | "isFavorite">;

export const useFavoritePokemonMutation = ({
  id,
  name,
  isFavorite,
}: FavoritePokemonsArgs) => {
  const [addToFavoriteMutation] = useMutation<FavoritePokemonMutation>(
    FAVORITE_POKEMON_MUTATION,
    {
      update(cache, { data }) {
        updateIsFavorite(cache, data?.favoritePokemon);
      },
    },
  );

  const [removeFromFavoriteMutation] = useMutation<UnfavoritePokemonMutation>(
    UNFAVORITE_POKEMON_MUTATION,
    {
      update(cache, { data }) {
        updateIsFavorite(cache, data?.unFavoritePokemon);
      },
    },
  );

  const addToFavorite = async () => {
    try {
      await addToFavoriteMutation({
        variables: { favoritePokemonId: id },
      });
      toast.success(`${name} added to favorites!`);
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromFavorite = async () => {
    try {
      await removeFromFavoriteMutation({
        variables: { unFavoritePokemonId: id },
      });
      toast.warning(`${name} removed from favorites!`);
    } catch (error) {
      handleError(error);
    }
  };

  const execute = () => {
    if (isFavorite) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };

  return { execute };
};
