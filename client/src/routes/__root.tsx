import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="container px-2 sm:px-8 mx-auto pt-4 h-svh w-svw">
      <Outlet />
      <Toaster position="bottom-left" />
    </div>
  ),
});
