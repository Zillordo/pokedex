import { Pokemon } from "@/generated/graphql";
import { Badge } from "@/components/ui/badge";

type Props = Pick<Pokemon, "types">;

export const PokemonTypesList = ({ types }: Props) => {
  return (
    <div className="flex items-center">
      {types?.map((type) => (
        <Badge className="mr-[0.20rem]" size="sm" variant="default" key={type}>
          {type}
        </Badge>
      ))}
    </div>
  );
};
