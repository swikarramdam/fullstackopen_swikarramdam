import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log(apiKey);
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    const fetchData = () => {
      const result = fetch(
        "https://studies.cs.helsinki.fi/restcountries/api/all"
      )
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => console.log(error));
    };
    const fetchWeather = () => {
      const weather = fetch(
        "https://api.openweathermap.org/data/2.5/weather?q={country.capital}&appid={apiKey}"
      )
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setWeatherData(weather);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  const filtered = countries.filter((obj) =>
    obj.name.common.toLowerCase().includes(search.toLowerCase())
  );
  const CountryDetails = ({ country }) => {
    return (
      <>
        <h1 key={country.name.common}>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        {Object.values(country.languages).map((language, index) => {
          return (
            <ul>
              <li key={index}>{language}</li>
            </ul>
          );
        })}
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weatherData.main.temp - 273.15} celsius</p>
      </>
    );
  };
  useEffect(() => {
    setSelected(null);
  }, [search]);
  return (
    <>
      <span>Find Countries</span>{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div>
        {filtered.length > 10 ? (
          "Too many matches, specify another filter"
        ) : filtered.length === 1 ? (
          //not country this is better approach to distinguish the country passed in the or condition
          <CountryDetails country={filtered[0]} />
        ) : selected ? (
          <CountryDetails country={selected} />
        ) : (
          filtered.map((country, idx) => (
            <div key={idx}>
              <p>{country.name.common}</p>
              <button onClick={() => setSelected(country)}>show</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
