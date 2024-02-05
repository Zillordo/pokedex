import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { forwardRef, useEffect, useMemo } from "react";
import { FavoritePokemonButton } from "../FavoritePokemonButton";
import { PokemonTypesList } from "../PokemonTypesList";
import { Pokemon } from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  types?: Pokemon["types"];
  sound?: Pokemon["sound"];
} & Pick<Pokemon, "name" | "image" | "isFavorite" | "id">;

export const PokemonCard = forwardRef<HTMLDivElement, Props>(
  ({ name, image, types, id, isFavorite, sound, className }, ref) => {
    const audio = useMemo(
      () => (sound ? new Audio(sound) : undefined),
      [sound],
    );

    useEffect(() => {
      audio?.load();
    }, [audio]);

    return (
      <Card className={cn("overflow-hidden", className)} ref={ref}>
        <AspectRatio className="relative">
          <img className="w-full h-full" src={image} />
          {audio && (
            <Button
              className="absolute bottom-[10px] left-[10px]"
              variant="ghost"
              size="icon"
              onClick={() => audio.play()}
            >
              <Volume2 />
            </Button>
          )}
        </AspectRatio>
        <div className="bg-secondary px-3 py-1">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <h2 className="font-bold">{name}</h2>
              {types && <PokemonTypesList types={types} />}
            </div>
            <div className="flex items-center">
              <FavoritePokemonButton
                id={id}
                isFavorite={isFavorite}
                name={name}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  },
);
