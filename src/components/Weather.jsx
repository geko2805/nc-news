import { useState, useEffect } from "react";
import ReactWeather, {
  useWeatherBit,
  useVisualCrossing,
} from "react-open-weather";

const Weather = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [fetchWeather, setFetchWeather] = useState(false); // Control when to fetch

  // Fetch user's location only once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setFetchWeather(true); // Trigger fetch with fallback coordinates
    }
  }, []);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLong(longitude);
    setLocationError(null);
    setFetchWeather(true); // Trigger weather fetch after coordinates are set
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    setLocationError("Unable to retrieve your location");
    setFetchWeather(true); // Use fallback coordinates if geolocation fails
  }

  // Fetch weather data only when fetchWeather is true
  //   const { data, isLoading, errorMessage } = useWeatherBit({
  //     // key: "d388aaf23f8f41e9bc9a07c6a282d21f",
  //     key: "a59bd04962a14e968be30d981a5e74ab",
  //     lat: lat || "48.137154", // Fallback to Munich
  //     lon: long || "11.576124",
  //     lang: "en",
  //     unit: "metric",
  //     skip: !fetchWeather, // Skip fetching until coordinates are ready
  //   });

  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: "C5XZ6SRZECHEVRHPESUFA2G99",
    lat: lat || "48.137154", // Use user's lat or fallback to Munich
    lon: long || "11.576124", // Use user's long or fallback to Munich
    lang: "en",
    unit: "metric", // values are (metric,us,uk)
    skip: !fetchWeather,
  });

  // Debugging: Log the data to inspect resolvedAddress
  useEffect(() => {
    if (data) {
      console.log("Weather data:", data);
      console.log("Resolved Address:", data.resolvedAddress);
    }
  }, [data]);

  // Extract city name from resolvedAddress, fallback to "Munich" if no data
  const locationLabel = data?.resolvedAddress
    ? data.resolvedAddress.split(",")[0] // Take the city part (e.g., "London")
    : lat && long
    ? "Your Location"
    : "Munich";
  return (
    <div>
      {locationError && <p style={{ color: "red" }}>{locationError}</p>}
      {errorMessage && (
        <p style={{ color: "red" }}>
          {errorMessage.includes("429")
            ? "Too many requests. Please try again later."
            : errorMessage}
        </p>
      )}
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={locationLabel}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </div>
  );
};

export default Weather;
