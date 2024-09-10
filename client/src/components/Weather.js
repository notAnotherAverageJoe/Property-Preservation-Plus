import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Weather.css";
import MaintenanceScheduler from "./MaintenanceScheduler";

function Weather() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
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
        `http://localhost:3000/api/weather?city=${city}&state=${state}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  function getWeatherEmoji(weatherCondition) {
    const weatherEmoji = {
      Rain: "🌧️",
      Storm: "⛈️",
      Snow: "❄️",
      Drizzle: "🌦️",
      Clouds: "☁️",
      Clear: "☀️",
    };

    return weatherEmoji[weatherCondition] || "🌫️"; // Default emoji if condition is not matched
  }

  return (
    <div className="weather-dashboard">
      <h2>Weather Dashboard</h2>

      {/* Clock */}
      <div className="clock">
        <h3>{time.toLocaleTimeString()}</h3>
      </div>

      {/* Weather Form */}
      <form onSubmit={handleWeatherFetch}>
        <label htmlFor="city">Enter City Name: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State/Region: </label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Weather Info */}
      {weather && (
        <>
          <div className="weather-info">
            <h3>Weather in {weather.name}</h3>
            <p>
              <strong>Temperature:</strong> {weather.main.temp}°F
            </p>
            <p>
              <strong>Weather:</strong> {weather.weather[0].description}{" "}
              {getWeatherEmoji(weather.weather[0].main)}
            </p>
            <p>
              <strong>Humidity:</strong> {weather.main.humidity}%
            </p>
          </div>

          {/* MaintenanceScheduler Component */}
          <MaintenanceScheduler weatherData={weather} />
        </>
      )}
    </div>
  );
}

export default Weather;
