import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // Fetch all countries once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Filter countries based on search
  const filtered = countries.filter((obj) =>
    obj.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Component to show details of a single country + weather
  const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
      if (!country.capital) return;

      const fetchWeather = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
          );
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchWeather();
    }, [country]);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((lang, idx) => (
            <li key={idx}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

        {weather ? (
          <>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Condition: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    );
  };

  // Reset selected when search changes
  useEffect(() => {
    setSelected(null);
  }, [search]);

  return (
    <>
      <span>Find Countries: </span>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filtered.length > 10 ? (
          "Too many matches, specify another filter"
        ) : filtered.length === 1 ? (
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
