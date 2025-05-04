"use client";

import { useState, useEffect } from "react";
import "../globals.css";
import Profile from "../components/Profile";
import axios from "../utils/api";

export default function ProfilePage() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      const res = await axios.get(`/weather/city?city=${city}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeather(res.data);
      setError("");
    } catch (error) {
      setWeather(null);
      setError(error.response?.data?.message || error.message);
    }
  };

  const { name, main, weather: weatherArray, coord } = weather || {};
  const temperature = Math.round(main?.temp);
  const description = weatherArray?.[0]?.description;
  const iconCode = weatherArray?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <Profile></Profile>
      <div className="bg">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white/10 p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Weather
            </h1>
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter city"
                  className="bg-white/20 text-white rounded-l py-2 px-4 w-full focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              <div className="text-white mt-4 p-4 bg-white/10 rounded-md">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>

                <p className="text-lg">Temperature: {temperature}°C</p>
                <p className="text-lg">
                  Feels Like: {Math.round(main?.feels_like)}°C
                </p>
                <p className="text-lg">
                  Min Temp: {Math.round(main?.temp_min)}°C
                </p>

                {description && (
                  <p className="capitalize">Description: {description}</p>
                )}
                {iconCode && (
                  <img
                    src={iconUrl}
                    alt="Weather Icon"
                    className="w-20 h-20 mt-2"
                  />
                )}

                {weather?.coord && (
                  <p className="text-sm mt-2">
                    Location: {weather.coord.lat}, {weather.coord.lon}
                  </p>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
