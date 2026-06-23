import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";

const URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true, error: "" };

    case "SET_CITIES":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "CREATE_CITY":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "SET_CURRENT_CITY":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "DELETE_CITY":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity.id === action.payload ? {} : state.currentCity,
      };

    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "SET_LOADING" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();

        dispatch({ type: "SET_CITIES", payload: data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch cities" });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;
    console.log("Fetching city with id:", id);

    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "SET_CURRENT_CITY", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch city" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      dispatch({ type: "CREATE_CITY", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "SET_LOADING" });

    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "DELETE_CITY",
        payload: id,
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
