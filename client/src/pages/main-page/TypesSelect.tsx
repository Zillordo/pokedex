import { GET_POKEMON_TYPES } from "@/apollo/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@apollo/client";
import { ComponentProps } from "react";

type Props = Pick<ComponentProps<typeof Select>, "onValueChange">;

export const TypeSelect = (props: Props) => {
  const { data } = useQuery(GET_POKEMON_TYPES);

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <Separator className="my-1" />
          <SelectLabel>Types</SelectLabel>
          {data?.pokemonTypes?.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
