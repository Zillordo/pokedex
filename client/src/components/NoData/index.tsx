import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

type Props = {
  message?: string;
  className?: string;
};

export const NoData = ({ message, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className,
      )}
    >
      <InfoIcon className="h-16 w-16 text-gray-400 dark:text-gray-600" />
      <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
        No Data Available
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};
