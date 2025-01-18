import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [loader,setLoader] = useState(false);
  const [history,setHistory] = useState([]);


  const fetchData = async (e) => {
    setLoader(true);
    if (e.key === "Enter") {
      try {
        const data = await fetchWeather(cityName);
        setWeatherData(data);
        setCityName("");
        setError(null);
        setHistory((old)=> [cityName, ...old])
      } catch (error) {
        setError(error.message);
      }
    }
    setLoader(false);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      {loader && <div style={{ color: "red" }}>loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loader &&  weatherData &&  (
        <div>
          <h2>
            {weatherData?.location?.name}, {weatherData?.location?.region},{" "}
            {weatherData?.location?.country}
          </h2>
          <p>
            Temperature: {weatherData?.current?.temp_c} °C (
            {weatherData?.current?.temp_f} °F)
          </p>
          <p>Condition: {weatherData?.current?.condition?.text}</p>
          <img
            src={weatherData?.current?.condition?.icon}
            alt={weatherData?.current?.condition?.text}
          />
          <p>Humidity: {weatherData?.current?.humidity}</p>
          <p>Pressure: {weatherData?.current?.pressure_mb}</p>
          <p>Visibility: {weatherData?.current?.vis_km}</p>
        </div>
      )} 

      <div>
        <h1>history</h1>
        {history.map((name, i) => (
            <li key={i}>
              <span onClick={() => fetchData(name)}>{name}</span>
            </li>
          ))}
      </div>
    </div>
  );
};

export default App;
