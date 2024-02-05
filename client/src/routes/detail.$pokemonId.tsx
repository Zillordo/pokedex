import { DetailPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

const DetailRoute = () => {
  const { pokemonId } = Route.useParams();
  return <DetailPage pokemonId={pokemonId} />;
};

export const Route = createFileRoute("/detail/$pokemonId")({
  component: DetailRoute,
});
