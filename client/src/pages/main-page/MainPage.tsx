import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LayoutGrid, AlignJustify } from "lucide-react";
import { useDebounceState } from "@/lib/debounceState.hook";
import { TypeSelect } from "./TypesSelect";
import { PokemonList } from "./PokemonsList";
import { useLocalStorage } from "@/lib/local-storage.hook";
import { ThemeSelect } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

enum ETabs {
  All = "all",
  Favorites = "favorites",
}

export const MainPage = () => {
  const [localStorageTableView, setLocalStorageTableView] =
    useLocalStorage<boolean>("view");
  const [typeFilter, setTypeFilter] = useState<string>();
  const [search, setSearch] = useDebounceState<string | undefined>(
    undefined,
    200,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Tabs
      defaultValue="all"
      className="grid grid-rows-[min-content_1fr] h-full overflow-hidden"
    >
      <div>
        <TabsList className="flex w-full mb-1">
          <TabsTrigger className="flex-1" value={ETabs.All}>
            All
          </TabsTrigger>
          <TabsTrigger className="flex-1" value={ETabs.Favorites}>
            Favorites
          </TabsTrigger>
        </TabsList>

        <div className="flex py-1 gap-3 sm:flex-row flex-col">
          <Input
            onChange={handleSearch}
            placeholder="Search"
            className="flex-[1.5]"
          />
          <div className="flex gap-3 flex-1">
            <TypeSelect onValueChange={setTypeFilter} />
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setLocalStorageTableView((prev) => !prev)}
              >
                {localStorageTableView ? <LayoutGrid /> : <AlignJustify />}
              </Button>
              <ThemeSelect />
            </div>
          </div>
        </div>
      </div>

      <TabsContent className="overflow-hidden" value={ETabs.All}>
        <PokemonList
          view={localStorageTableView ? "table" : "grid"}
          filter={
            typeFilter
              ? {
                  type: typeFilter === "all" ? undefined : typeFilter,
                }
              : undefined
          }
          search={search}
        />
      </TabsContent>
      <TabsContent className="overflow-hidden" value={ETabs.Favorites}>
        <PokemonList
          view={localStorageTableView ? "table" : "grid"}
          filter={{
            type: typeFilter === "all" ? undefined : typeFilter,
            isFavorite: true,
          }}
          search={search}
        />
      </TabsContent>
    </Tabs>
  );
};
