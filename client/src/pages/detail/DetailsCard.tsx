import { Pokemon } from "@/generated/graphql";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = Pick<Pokemon, "name" | "maxCP" | "maxHP" | "weight" | "height"> & {
  evolutionsNumber: number;
  className?: string;
};

export const DetailsCard = ({
  name,
  evolutionsNumber,
  maxCP,
  maxHP,
  weight,
  height,
  className,
}: Props) => {
  const cpHpRatio = maxCP / maxHP;

  return (
    <Card className={cn("w-full flex-1 flex flex-col", className)}>
      <CardHeader className="lg:p-6 p-3">
        <CardTitle>Details</CardTitle>
        <CardDescription>Check out statistics about {name}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col lg:p-6 p-3 pt-0">
        <div className="flex flex-col lg:gap-3 gap-0">
          <div>
            <Progress
              value={100 / (evolutionsNumber + 1) / cpHpRatio}
              progressBarClassName="bg-green-500"
            />
            <h3>HP: {maxHP}</h3>
          </div>

          <div>
            <Progress
              value={100 / (evolutionsNumber + 1)}
              progressBarClassName="bg-sky-500"
            />
            <h3>CP: {maxCP}</h3>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex flex-col lg:flex-row flex-1 gap-2">
          <div className="flex flex-row lg:flex-col flex-1 items-center lg:justify-center justify-between">
            <h2 className="font-semibold">Weight</h2>
            <div>
              {weight.minimum} - {weight.maximum}
            </div>
          </div>

          <div className="flex flex-row lg:flex-col flex-1 items-center lg:justify-center justify-between">
            <h2 className="font-semibold">Height</h2>
            <div>
              {height.minimum} - {height.maximum}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
