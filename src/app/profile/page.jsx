"use client";

import Profile from "../components/Profile";
import WeatherSearch from "../components/WeatherSearch";
import WeatherDisplay from "../components/WeatherDisplay";
import { useState } from "react";

export default function ProfilePage() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherUpdate = (data) => {
    setWeatherData(data);
  };

  return (
    <div>
      <Profile />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Weather
          </h1>
          <div className="text-center text-white py-3">
            <WeatherSearch onWeatherUpdate={handleWeatherUpdate} />
            <WeatherDisplay weather={weatherData} />
          </div>
        </div>
      </div>
    </div>
  );
}
