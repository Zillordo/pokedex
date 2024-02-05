import { Pokemon } from "@/generated/graphql";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  evolutions: Pick<Pokemon, "id" | "name" | "image" | "isFavorite">[];
  className?: string;
};

export const Evolutions = ({ evolutions, className }: Props) => {
  if (!evolutions.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col lg:gap-2 gap-1", className)}>
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        Evolutions
      </h2>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {evolutions.map((evolution) => (
            <CarouselItem key={evolution.id} className="md:basis-1/2">
              <Link
                to="/detail/$pokemonId"
                params={{ pokemonId: evolution.id }}
              >
                <PokemonCard
                  name={evolution.name}
                  isFavorite={evolution.isFavorite}
                  id={evolution.id}
                  image={evolution.image}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={`-left-9 ${evolutions.length > 2 ? "" : "inline-flex md:hidden"}`}
        />
        <CarouselNext
          className={`-right-9 ${evolutions.length > 2 ? "" : "inline-flex md:hidden"}`}
        />
      </Carousel>
    </div>
  );
};
