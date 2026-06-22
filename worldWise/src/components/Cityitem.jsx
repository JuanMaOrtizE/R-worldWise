import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContexts.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Cityitem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${currentCity.id === city.id ? styles["cityItem--active"] : ""} `}
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>

        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;{" "}
        </button>
      </Link>
    </li>
  );
}

export default Cityitem;
