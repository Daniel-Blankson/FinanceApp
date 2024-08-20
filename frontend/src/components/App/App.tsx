import {
  Outlet,
  RouterProvider,
  createReactRouter,
  createRouteConfig,
} from "@tanstack/react-router";
import Index from "../../Index";
import Form from "../Form/Form";

const rootRoute = createRouteConfig({
  component: Outlet,
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: Index,
});

const formRoute = rootRoute.createRoute({
  path: "/form",
  component: Form,
});

const routeConfig = rootRoute.addChildren([indexRoute, formRoute]);

const router = createReactRouter({ routeConfig });

function App() {
  return <RouterProvider router={router} />;
}
export default App;

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}
