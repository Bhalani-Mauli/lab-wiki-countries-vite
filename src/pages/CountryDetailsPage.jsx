import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CountryDetailsPage = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${countryId}`
        );
        setCountry(response.data);
      } catch (error) {
        console.error("Error fetching country details:", error.message);
      }
    };

    getCountryDetails();
  }, [countryId]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
      <div className="table">
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
          alt={`${country.name.common} flag`}
        />
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km</p>

        <p>Borders:</p>

        {country &&
          country.borders.map((border) => (
            <ul>
              <li key={border}>
                <Link to={`/${border}`}>{border}</Link>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
