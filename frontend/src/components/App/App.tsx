import { RouterProvider, Route, RootRoute, Router, Outlet } from '@tanstack/react-router';
import Dashboard from "../../pages/Dashboard";
import Form from "../Form/Form";

// Define the root route
const rootRoute = new RootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

// Define the individual routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const formRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: Form,
});

// Combine the routes into a route tree
const routeTree = rootRoute.addChildren([indexRoute, formRoute]);

// Create the router instance
const router = new Router({ routeTree });

// Export the main App component
export default function App() {
  return <RouterProvider router={router} />;
}

// TypeScript module augmentation to register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
