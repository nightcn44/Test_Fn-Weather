"use client";

import { useState } from "react";
import api from "../utils/api";

export default function WeatherSearch({ onWeatherUpdate }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await api.get(`/weather/city?city=${city}`); // เปลี่ยน endpoint ให้ตรงกับ backend ของคุณ
      onWeatherUpdate(response.data);
      setCity("");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to fetch weather"
      );
      onWeatherUpdate(null);
    }
  };

  return (
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
