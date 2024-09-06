import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import PropTypes from "prop-types";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((uniqueCountries, city) => {
    if (!uniqueCountries.find((el) => el.country === city.country)) {
      uniqueCountries.push({ country: city.country, emoji: city.emoji });
    }
    return uniqueCountries;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
};
export default CountryList;
