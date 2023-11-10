import { createTheme, MantineProvider } from "@mantine/core";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrewHistory } from "./BrewHistory";
import { CoffeeList } from "./CoffeeList";
import { Layout } from "./Layout";
import { AuthProvider } from "./AuthProvider";
import { SignInPage } from "./SignInPage";

const queryClient = new QueryClient();

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
        path: "sign-in",
        element: <SignInPage />,
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

const theme = createTheme({
  headings: { fontWeight: "600" },
});

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
