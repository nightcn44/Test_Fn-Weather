"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import Profile from "../components/Profile";
import axios from "../utils/api";

export default function ProfilePage() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

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
      <Profile />
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

              {weather && (
                <div className="text-white mt-4 p-4 bg-white/10 rounded-md">
                  <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
                  {weather.main?.temp && (
                    <p className="text-lg">
                      Temperature: {Math.round(weather.main.temp)}°C
                    </p>
                  )}
                  {weather.weather?.[0]?.description && (
                    <p className="capitalize">
                      Description: {weather.weather[0].description}
                    </p>
                  )}
                  {weather.coord && (
                    <p className="text-sm mt-2">
                      Location: {weather.coord.lat}, {weather.coord.lon}
                    </p>
                  )}
                  {weather.weather?.[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      className="w-20 h-20 mt-2"
                    />
                  )}
                </div>
              )}

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
