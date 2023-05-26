import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherThunk } from "../../store/weather";
import "./Weather.css";

const WeatherForecast = ({ lat, lng }) => {
  console.log("lng in weather forecast👉", lng);
  console.log("lat in weather forecase👉", lat);
  const dispatch = useDispatch();
  const getWeather = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeatherThunk(lat, lng));
  }, [dispatch]);

  if (!getWeather.current) return null;

  const formatForecast = () => {
    const forecast = [];
    for (let i = 0; i < 5; i++) {
      forecast.push(getWeather.daily[i]);
    }
    return forecast;
  };

  const formattedForecast = formatForecast();
  console.log("formattedForecast 👉", formattedForecast);
  const formattedDay = (timestamp) => {
    const day = new Date(timestamp * 1000).toLocaleString("en-US", {
      weekday: "long",
    });
    return day;
  };

  return (
    <div className="forecast-container">
      {formattedForecast.map((day, i) => (
        <div key={i} className="forecast-item">
          <p className="forecast-day">{formattedDay(day.dt)}</p>
          <img
            alt={day.dt}
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          />
          <p className="forecast-desc">{day.weather[0].description}</p>
          <p className="forecast-temp">
            {Math.round(day.temp.min)}° / {Math.round(day.temp.max)}° F
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
