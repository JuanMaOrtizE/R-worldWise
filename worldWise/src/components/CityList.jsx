import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import Cityitem from "./Cityitem.jsx";
import { useCities } from "../contexts/CitiesContexts.jsx";

function CityList() {
  const { cities, isLoading } = useCities();

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
