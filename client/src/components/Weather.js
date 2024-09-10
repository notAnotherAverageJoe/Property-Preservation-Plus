import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

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
    <div className="weather-dashboard">
      <h2>Weather Dashboard</h2>

      {/* Clock */}
      <div className="clock">
        <h3>{time.toLocaleTimeString()}</h3>
      </div>

      {/* Weather Form */}
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

      {/* Weather Info */}
      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.name}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp.toFixed(1)}°C
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
