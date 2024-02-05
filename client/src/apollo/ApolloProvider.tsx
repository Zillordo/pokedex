import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

type Props = {
  children: React.ReactNode;
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: ["filter", "search"],
            merge(existing, incoming, { args }) {
              const incomingEdges = incoming.edges;
              const mergedEdges = existing?.edges
                ? existing?.edges.slice(0)
                : [];

              if (incoming) {
                if (args) {
                  const { offset = 0 } = args;

                  for (let i = 0; i < incomingEdges.length; ++i) {
                    mergedEdges[offset + i] = incomingEdges[i];
                  }
                } else {
                  mergedEdges.push(...incomingEdges);
                }
              }

              return {
                ...incoming,
                edges: mergedEdges,
              };
            },
          },
        },
      },
    },
  }),
});

const ApolloAppProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloAppProvider;
