import {
  Outlet,
  RouterProvider,
  createReactRouter,
  createRouteConfig,
} from "@tanstack/react-router";
import Dashboard from "../../Dashboard";
import Form from "../Form/Form";

const rootRoute = createRouteConfig({
  component: Outlet,
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: Dashboard,
});

const formRoute = rootRoute.createRoute({
  path: "/form",
  component: Form,
});

const routeConfig = rootRoute.addChildren([indexRoute, formRoute]);

const router = createReactRouter({ routeConfig });

export default function App() {
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}
