import React from "react";

function MaintenanceScheduler({ weatherData }) {
  function getWeatherCondition(weatherData) {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      // Return the main weather condition
      return weatherData.weather[0].main;
    }
    return null;
  }

  function getWeatherResponse(weatherCondition) {
    const goodConditions = ["Clear", "Clouds"]; // Adjust these conditions as needed

    if (weatherCondition) {
      if (goodConditions.includes(weatherCondition)) {
        return "Great day for outdoor work!";
      } else {
        const weatherEmoji = {
          Rain: "🌧️",
          Storm: "⛈️",
          Snow: "❄️",
          Drizzle: "🌦️",
          Clouds: "☁️",
          Clear: "☀️",
        };

        return `Not ideal for outdoor work. Current weather: ${weatherCondition} ${
          weatherEmoji[weatherCondition] || "🌫️"
        }`;
      }
    } else {
      return "Weather data is not available.";
    }
  }

  const currentWeatherCondition = getWeatherCondition(weatherData);
  const weatherResponse = getWeatherResponse(currentWeatherCondition);

  return (
    <div className="maintenance-scheduler">
      <h3>Maintenance Advice</h3>
      <p>{weatherResponse}</p>
    </div>
  );
}

export default MaintenanceScheduler;
