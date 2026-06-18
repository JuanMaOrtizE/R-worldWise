// import styles from "./CityList.module.css";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import Countryitem from "./Countryitem.jsx";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true);

        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();

        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  if (isLoading) return <Spinner />;

  const uniqueCountries = countries.reduce((acc, city) => {
    if (!acc.map((c) => c.country).includes(city.country))
      return [
        ...acc,
        { id: city.id, country: city.country, emoji: city.emoji },
      ];
    else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <Countryitem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
