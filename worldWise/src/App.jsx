import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/product", element: <Product /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/login", element: <Login /> },
  { path: "/app", element: <AppLayout /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
