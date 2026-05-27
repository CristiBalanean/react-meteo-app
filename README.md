# ☁️ Meteo — Weather Dashboard

A clean, responsive weather dashboard built with React. Search any city and get real-time weather data including current conditions, a 5-day forecast, and a temperature overview chart.

🔗 **Live Site:** [cristibalanean.github.io/react-meteo-app](https://cristibalanean.github.io/react-meteo-app/)

---

## Features

- **Real-time weather data** — current temperature, feels like, humidity, and wind speed
- **5-day forecast** — daily high/low temperatures with weather icons
- **Temperature chart** — visual overview of the week's temperatures using Recharts
- **City search** — look up weather for any city worldwide
- **°C / °F toggle** — switch between Celsius and Fahrenheit
- **Error handling** — friendly message when a city isn't found

---

## Tech Stack

- **React** — UI framework
- **Vite** — Build tool & dev server
- **Recharts** — Charting library for temperature visualization
- **OpenWeatherMap API** — Weather data provider
- **GitHub Pages** — Hosting & deployment

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Installation

```bash
git clone https://github.com/CristiBalanean/react-meteo-app.git
cd react-meteo-app
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build & Deploy

```bash
npm run build
npm run deploy
```

---

## Project Structure

```
src/
├── App.jsx          # Main component — weather logic, API calls, UI
├── index.css        # All styles
└── main.jsx         # Entry point
```

---

## API

This app uses the [OpenWeatherMap Forecast API](https://openweathermap.org/forecast5) to fetch 5-day weather data in 3-hour intervals. The data is grouped by day to calculate daily highs and lows.
