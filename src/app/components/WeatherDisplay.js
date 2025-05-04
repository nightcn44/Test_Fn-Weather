"use client";

export default function WeatherDisplay({ weather }) {
  if (!weather) {
    return <p className="text-white/80">Enter a city to see the weather.</p>;
  }

  const { name, main, weather: weatherArray } = weather;
  const temperature = Math.round(main?.temp);
  const description = weatherArray?.[0]?.description;
  const iconCode = weatherArray?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="text-white mt-4 p-4 bg-white/10 rounded-md">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      {temperature && <p className="text-lg">Temperature: {temperature}°C</p>}
      {description && <p className="capitalize">Description: {description}</p>}
      {iconCode && (
        <img src={iconUrl} alt="Weather Icon" className="w-20 h-20 mt-2" />
      )}
    </div>
  );
}
