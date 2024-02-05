import { FavoritePokemonButton } from "@/components/FavoritePokemonButton";
import { PokemonTypesList } from "@/components/PokemonTypesList";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { TablePokemonType } from "./PokemonsTable.types";

export const COLUMNS_DEF: ColumnDef<TablePokemonType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <AspectRatio>
        <img className="h-full w-full" src={row.getValue("image")} />
      </AspectRatio>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "types",
    header: "Types",
    cell: ({ row }) => <PokemonTypesList types={row.getValue("types")} />,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <div className="flex align-center justify-end gap-3">
          <FavoritePokemonButton {...original} />

          <Link
            to="/detail/$pokemonId"
            params={{ pokemonId: original.id as string }}
          >
            <Button>Detail</Button>
          </Link>
        </div>
      );
    },
  },
];
