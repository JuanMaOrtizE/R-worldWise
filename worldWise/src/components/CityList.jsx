// import styles from "./CityList.module.css";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import Cityitem from "./Cityitem.jsx";

function CityList() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch("http://localhost:9000/cities");
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

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
