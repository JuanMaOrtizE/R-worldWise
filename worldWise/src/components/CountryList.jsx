import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import Countryitem from "./Countryitem.jsx";
import { useCities } from "../contexts/CitiesContexts.jsx";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  const uniqueCountries = cities.reduce((acc, city) => {
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
