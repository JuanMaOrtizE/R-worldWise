import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

export { CitiesProvider, useCities };
