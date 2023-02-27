import { MantineProvider } from "@mantine/core";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { BrewHistory } from "./BrewHistory";
import { CoffeeList } from "./CoffeeList";
import { Layout } from "./Layout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <CoffeeList />,
        },
        {
          path: "coffees/:coffeeId",
          element: <BrewHistory />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ],
  { basename: "/coffee-log" }
);

export function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", headings: { fontWeight: 600 } }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
