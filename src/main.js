fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,weather_code,is_day`,
)
  .then((response) => response.json())
  .then((data) => {
    const current = data.current;
    const temp = current.temperature_2m;
    const code = current.weather_code;
    const isDay = current.is_day;

    const description = getWeatherDescription(code, isDay);

    document.querySelector("#weather").innerHTML = `
      <h1>${temp}°C</h1>
      <p>${description}</p>
    `;
  })
  .catch((err) => {
    document.querySelector("#weather").innerHTML =
      `<p>Error: ${err.message}</p>`;
  });

document.querySelector("#searchBox").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value;
    window.location.href = `https://www.google.com/search?q=${query}`;
  }
});

function getWeatherDescription(code, isDay) {
  if (code === 0) return isDay ? "Clear sky" : "Clear night";
  if (code <= 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 86) return "Snowing";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}
