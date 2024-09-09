import React, { useState } from "react";
import axios from "axios";
import "../components/Weather.css"; // Assuming you have some styles

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleWeatherFetch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="weather-container">
      <h2>Check Weather</h2>
      <form onSubmit={handleWeatherFetch}>
        <label htmlFor="city">Enter City Name:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.name}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp.toFixed(2)}°F
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
