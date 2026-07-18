fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=43.68&longitude=-79.63&current=temperature_2m,weather_code,is_day&timezone=auto`
)
  .then((response) => response.json())
  .then((data) => {
    const current = data.current || {};
    const temp = current.temperature_2m ?? "--";
    const code = current.weather_code ?? 0;
    const isDay = current.is_day === 1;
    const description = getWeatherDescription(code, isDay);

    document.querySelector("#weather").innerHTML = `
      <h1>~${temp}°C</h1>
      <p>${description} - Toronto</p>
    `;

    let bgImage = "WINDOWS_XP.jpg";
    let tabColor = "rgba(255, 255, 255, 0.9)";

    if (description === "Clear sky") {
      bgImage = "WINDOWS_XP.jpg";
    } else if (description === "Clear night") {
      bgImage = "WINDOWS_XPNIGHT.jpg";
    } else if (description === "Cloudy night") {
      bgImage = "WINDOWS_XPNIGHT.jpg";
      tabColor = "rgba(169, 169, 169, 0.9)";
    } else if (description === "Cloudy") {
      bgImage = "WINDOWS_XPCLOUDY.jpg";
      tabColor = "rgba(211, 211, 211, 0.9)";
    } else if (description.includes("Foggy")) {
      bgImage = "WINDOWS_XPFOGGY.jpg";
      tabColor = "rgba(211, 211, 211, 0.9)";
    } else if (description.includes("Rainy")) {
      bgImage = "WINDOWS_XPRAINY.jpg";
      tabColor = "rgba(211, 211, 211, 0.9)";
    } else if (description.includes("Snowing")) {
      bgImage = "WINDOWS_XPSNOWY.jpg";
      tabColor = "rgba(211, 211, 211, 0.9)";
    } else if (description.includes("Thunderstorm")) {
      bgImage = "WINDOWS_XPTHUNDERSTORM.jpg";
      tabColor = "rgba(211, 211, 211, 0.9)";
    }

    document.body.style.backgroundImage = `url('src/${bgImage}')`;

    const weatherBox = document.querySelector(".weather-box");
    if (weatherBox) weatherBox.style.backgroundColor = tabColor;
    
    const middleBox = document.querySelector(".middle-box");
    if (middleBox) middleBox.style.backgroundColor = tabColor;

    const searchBox = document.querySelector(".search-box");
    if (searchBox) searchBox.style.backgroundColor = tabColor;
  })
  .catch((err) => {
    document.querySelector("#weather").innerHTML = `<h1>Error</h1><p>Check Console</p>`;
  });

document.querySelector("#searchBox").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    window.location.href = `https://www.google.com/search?q=${e.target.value}`;
  }
});

function getWeatherDescription(code, isDay) {
  if (code === 0) return isDay ? "Clear sky" : "Clear night";
  if (code <= 3) return isDay ? "Cloudy" : "Cloudy night";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 86) return "Snowing";
  if (code >= 95) return "Thunderstorm";
  return "Partly Cloudy";
}
