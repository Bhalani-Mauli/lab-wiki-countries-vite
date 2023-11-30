import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(
          "https://ih-countries-api.herokuapp.com/countries"
        );
        setCountries(response.data);
      } catch (e) {
        console.log("error", e);
      }
    };
    getCountries();
  }, []);

  return (
    <div
      className="container"
      style={{ maxHeight: "90vh", overflow: "scroll" }}
    >
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>
      <div className="list-group">
        {countries.map((country) => (
          <div className="list-group-item list-group-item-action">
            <li key={country.alpha3Code}>
              <Link to={`/${country.alpha3Code}`}>
                <img
                  src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                  alt={`${country.name.common} flag`}
                />
                {country.name.common}
              </Link>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
