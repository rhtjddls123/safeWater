import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import ViolationsPage from "./pages/Violations";
import ErrorPage from "./pages/Error";
import { queryClient } from "./util/http";
import ProductDetailsPage from "./pages/ProductDetails";
import ViolationDetailsPage from "./pages/ViolationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
    errorElement: <ErrorPage />
  },
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        children: []
      },
      { path: "/home/:productId", element: <ProductDetailsPage /> },
      {
        path: "/violations",
        element: <ViolationsPage />
      },
      { path: "/violations/:violationId", element: <ViolationDetailsPage /> }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
