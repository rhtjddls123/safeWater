import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViolationsPage from "./pages/Violations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "violations",
        element: <ViolationsPage />
      }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
