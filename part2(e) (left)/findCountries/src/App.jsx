import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
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
          console.log(data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);
  const filtered = countries.filter((obj) =>
    obj.name.common.toLowerCase().includes(search.toLowerCase())
  );
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
        {filtered.length > 10
          ? "Too many matches, specify another filter"
          : filtered.map((country, idx) => {
              if (filtered.length === 1) {
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
                    <img
                      src={country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                    />
                  </>
                );
              }
              return <p key={idx}>{country.name.common}</p>;
            })}
      </div>
    </>
  );
}

export default App;

// {
//     "name": {
//       "common": "Kuwait",
//       "official": "State of Kuwait",
//       "nativeName": {
//         "ara": {
//           "official": "دولة الكويت",
//           "common": "الكويت"
//         }
//       }
//     },
//     "tld": [
//       ".kw"
//     ],
//     "cca2": "KW",
//     "ccn3": "414",
//     "cca3": "KWT",
//     "cioc": "KUW",
//     "independent": true,
//     "status": "officially-assigned",
//     "unMember": true,
//     "currencies": {
//       "KWD": {
//         "name": "Kuwaiti dinar",
//         "symbol": "د.ك"
//       }
//     },
//     "idd": {
//       "root": "+9",
//       "suffixes": [
//         "65"
//       ]
//     },
//     "capital": [
//       "Kuwait City"
//     ],
//     "altSpellings": [
//       "KW",
//       "State of Kuwait",
//       "Dawlat al-Kuwait"
//     ],
//     "region": "Asia",
//     "subregion": "Western Asia",
//     "languages": {
//       "ara": "Arabic"
//     },
//     "translations": {
//       "ara": {
//         "official": "دولة الكويت",
//         "common": "الكويت"
//       },
//       "bre": {
//         "official": "Stad Koweit",
//         "common": "Koweit"
//       },
//       "ces": {
//         "official": "Stát Kuvajt",
//         "common": "Kuvajt"
//       },
//       "cym": {
//         "official": "State of Kuwait",
//         "common": "Kuwait"
//       },
//       "deu": {
//         "official": "Staat Kuwait",
//         "common": "Kuwait"
//       },
//       "est": {
//         "official": "Kuveidi Riik",
//         "common": "Kuveit"
//       },
//       "fin": {
//         "official": "Kuwaitin valtio",
//         "common": "Kuwait"
//       },
//       "fra": {
//         "official": "État du Koweït",
//         "common": "Koweït"
//       },
//       "hrv": {
//         "official": "Država Kuvajt",
//         "common": "Kuvajt"
//       },
//       "hun": {
//         "official": "Kuvaiti Állam",
//         "common": "Kuvait"
//       },
//       "ita": {
//         "official": "Stato del Kuwait",
//         "common": "Kuwait"
//       },
//       "jpn": {
//         "official": "クウェート国",
//         "common": "クウェート"
//       },
//       "kor": {
//         "official": "쿠웨이트국",
//         "common": "쿠웨이트"
//       },
//       "nld": {
//         "official": "Staat Koeweit",
//         "common": "Koeweit"
//       },
//       "per": {
//         "official": "دولت کویت",
//         "common": "کُویت"
//       },
//       "pol": {
//         "official": "Państwo Kuwejt",
//         "common": "Kuwejt"
//       },
//       "por": {
//         "official": "Estado do Kuwait",
//         "common": "Kuwait"
//       },
//       "rus": {
//         "official": "Государство Кувейт",
//         "common": "Кувейт"
//       },
//       "slk": {
//         "official": "Kuvajtský štát",
//         "common": "Kuvajt"
//       },
//       "spa": {
//         "official": "Estado de Kuwait",
//         "common": "Kuwait"
//       },
//       "srp": {
//         "official": "Држава Кувајт",
//         "common": "Кувајт"
//       },
//       "swe": {
//         "official": "Staten Kuwait",
//         "common": "Kuwait"
//       },
//       "tur": {
//         "official": "Kuveyt Devleti",
//         "common": "Kuveyt"
//       },
//       "urd": {
//         "official": "دولتِ کویت",
//         "common": "کویت"
//       },
//       "zho": {
//         "official": "科威特国",
//         "common": "科威特"
//       }
//     },
//     "latlng": [29.5, 45.75],
//     "landlocked": false,
//     "borders": [
//       "IRQ",
//       "SAU"
//     ],
//     "area": 17818,
//     "demonyms": {
//       "eng": {
//         "f": "Kuwaiti",
//         "m": "Kuwaiti"
//       },
//       "fra": {
//         "f": "Koweïtienne",
//         "m": "Koweïtien"
//       }
//     },
//     "flag": "🇰🇼",
//     "maps": {
//       "googleMaps": "https://goo.gl/maps/aqr3aNQjS1BAvksJ7",
//       "openStreetMaps": "https://www.openstreetmap.org/relation/305099"
//     },
//     "population": 4270563,
//     "fifa": "KUW",
//     "car": {
//       "signs": [
//         "KWT"
//       ],
//       "side": "right"
//     },
//     "timezones": [
//       "UTC+03:00"
//     ],
//     "continents": [
//       "Asia"
//     ],
//     "flags": {
//       "png": "https://flagcdn.com/w320/kw.png",
//       "svg": "https://flagcdn.com/kw.svg",
//       "alt": "The flag of Kuwait is composed of three equal horizontal bands of green, white and red, with a black trapezium superimposed on the hoist side of the field. This trapezium has its base on the hoist end and spans about one-fourth the width of the field."
//     },
//     "coatOfArms": {
//       "png": "https://mainfacts.com/media/images/coats_of_arms/kw.png",
//       "svg": "https://mainfacts.com/media/images/coats_of_arms/kw.svg"
//     },
//     "startOfWeek": "sunday",
//     "capitalInfo": {
//       "latlng": [29.37, 47.97]
//     },
//     "postalCode": {
//       "format": "#####",
//       "regex": "^(\\d{5})$"
//     }
//   }
