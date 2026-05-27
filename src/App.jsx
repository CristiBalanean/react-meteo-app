import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Zalau");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    setError(null);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=866b049783c478b856eac3fad9bfce4a`)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== "200") {
          setError("City not found. Try using the English name.");
          return;
        }
        setWeatherData(data);
      });
  }, [city]);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setCity(query.trim());
    setQuery("");
  }

  if (!weatherData) {
    return <div className="app">Loading...</div>
  }

  const current = weatherData.list[0];
  const cityName = weatherData.city.name;
  const country = weatherData.city.country;

  const dailyMap = {};

  weatherData.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyMap[date]) {
      dailyMap[date] = {
        temps: [],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    }

    if (item.weather[0].icon.includes("d")) {
      dailyMap[date].icon = item.weather[0].icon;
      dailyMap[date].description = item.weather[0].description;
    }

    dailyMap[date].temps.push(item.main.temp);
  });

  const forecast = Object.entries(dailyMap).slice(1, 6).map(([date, data]) => {
    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    return {
      day: dayName,
      high: Math.round(Math.max(...data.temps)),
      low: Math.round(Math.min(...data.temps)),
      icon: data.icon,
      description: data.description,
    };
  });

  function convert(temp) {
    if (unit === "C") return Math.round(temp);
    return Math.round(temp * 1.8 + 32);
  }

  const forecastChart = forecast.map(day => ({
    ...day,
    high: convert(day.high),
    low: convert(day.low),
  }));

  return (
    <div className="app">
      <header className="header">
        <h1>Meteo</h1>
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          °C / °F
        </button>
      </header>

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="7" />
            <line x1="15.5" y1="15.5" x2="21" y2="21" />
          </svg>
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="current-weather">
        <div className="current-weather-info">
          <span className="current-location">{cityName}, {country}</span>
          <span className="current-temp">{convert(current.main.temp)}°{unit}</span>
          <span className="current-desc">{current.weather[0].description}</span>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt={current.weather[0].description}
          className="current-icon"
        />
      </div>

      <div className="stats">
        <div className="stat-card">
          <span className="stat-label">Feels Like</span>
          <span className="stat-value">{convert(current.main.feels_like)}°{unit}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{current.main.humidity}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{Math.round(current.wind.speed)} km/h</span>
        </div>
      </div>

      <div className="forecast">
        <p className="forecast-text">5 Day Forecast</p>
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div className="forecast-card" key={index}>
              <span className="forecast-day">{day.day}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="forecast-icon"
              />
              <span className="forecast-temps">{convert(day.high)}° / {convert(day.low)}°</span>
              <span className="forecast-desc">{day.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overview">
        <p className="overview-text">Temperature Overview</p>
        <div className="overview-card">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={forecastChart} barGap={4} barSize={20}>
              <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
              />
              <Bar dataKey="high" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="low" fill="#64748b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;