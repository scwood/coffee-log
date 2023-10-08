import { MantineProvider } from "@mantine/core";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { BrewHistory } from "./BrewHistory";
import { CoffeeList } from "./CoffeeList";
import { Layout } from "./Layout";
import { AuthProvider } from "./AuthProvider";

const router = createHashRouter([
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
]);

export function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", headings: { fontWeight: 600 } }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  );
}
