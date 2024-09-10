import React from "react";

function EnergyManagement({ weatherData }) {
  function getTemperatureAdvice(tempF) {
    // Use temperature in Fahrenheit, it was converted by Weather and passed along.

    if (tempF < 60) {
      return "Consider increasing heating to maintain comfort.";
    } else if (tempF > 80) {
      return "Consider increasing cooling to maintain comfort.";
    } else {
      return "Temperature is within the comfortable range.";
    }
  }

  function getWeatherAdvice(weatherCondition) {
    const weatherAdvice = {
      Rain: "Rainy weather might increase humidity; consider using a dehumidifier in order to avoid mold growth.",
      Snow: "Snowy weather may require increased heating. Ensure your heating system is functioning well. Keep outdoor units clear of snow coverage.",
      Clear:
        "Clear weather is ideal for energy savings. Use natural light and fresh air.",
      Clouds:
        "Cloudy weather may slightly reduce solar heating. Adjust heating or cooling as needed.",
      Drizzle:
        "Drizzly weather might be similar to rainy weather in terms of humidity. Consider dehumidification.",
      Storm:
        "Stormy weather can affect heating and cooling efficiency. Ensure your systems are well-maintained.",
    };

    return (
      weatherAdvice[weatherCondition] ||
      "No specific advice for current weather condition."
    );
  }

  if (!weatherData) {
    return <p>No weather data available.</p>;
  }

  const tempF = weatherData.main.temp; // Use temperature in Fahrenheit directly
  const weatherCondition = weatherData.weather[0].main;

  return (
    <div className="energy-management">
      <h3>Energy Management Recommendations</h3>
      <p>{getTemperatureAdvice(tempF)}</p>
      <p>{getWeatherAdvice(weatherCondition)}</p>
    </div>
  );
}

export default EnergyManagement;
