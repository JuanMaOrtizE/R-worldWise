import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContexts.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/product", element: <Product /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="cities" /> },
      { path: "cities", element: <CityList /> },
      { path: "cities/:id", element: <City /> },
      { path: "countries", element: <CountryList /> },
      { path: "form", element: <Form /> },
    ],
  },

  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <CitiesProvider>
      <RouterProvider router={router} />
    </CitiesProvider>
  );
}

export default App;
