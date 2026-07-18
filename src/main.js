fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=43.68&longitude=-79.63&current=temperature_2m,weather_code,is_day&timezone=auto`,
)
  .then((response) => response.json())
  .then((data) => {
    const current = data.current || data.current_weather || {};
    const temp = current.temperature_2m ?? current.temperature ?? "--";
    const code = current.weather_code ?? current.weathercode;
    const isDay = current.is_day ?? current.is_day;

    const description = getWeatherDescription(code, isDay);

    document.querySelector("#weather").innerHTML = `
      <h1>~${temp}°C</h1>
      <p>${description} - Toronto</p>
    `;

    let bgImage = `/src/WINDOWS_XP.jpg`;
    let tabColor = "";

    if (description === "Clear sky") {
      bgImage = `src/WINDOWS_XP.jpg`;
    } else if (description === "Clear night") {
      bgImage = `src/WINDOWS_XPNIGHT.jpg`;
    } else if (description === "Cloudy night") {
      bgImage = `src/WINDOWS_XPNIGHT.jpg`;
      tabColor = "darkgray";
    } else if (description === "Cloudy") {
      bgImage = `src/WINDOWS_XPCLOUDY.jpg`;
      tabColor = "lightgray";
    } else if (description.includes("Foggy")) {
      bgImage = `src/WINDOWS_XPFOGGY.jpg`;
      tabColor = "lightgray";
    } else if (description.includes("Rainy")) {
      bgImage = `src/WINDOWS_XPRAINY.jpg`;
      tabColor = "lightgray";
    } else if (description.includes("Snowing")) {
      bgImage = `src/WINDOWS_XPSNOWY.jpg`;
      tabColor = "lightgray";
    } else if (description.includes("Thunderstorm")) {
      bgImage = `src/WINDOWS_XPTHUNDERSTORM.jpg`;
      tabColor = "lightgray";
    }

    document.body.style.backgroundImage = `url(${bgImage})`;

    document.querySelector("#weather").style.backgroundColor = "transparent";

    const topBox = document.querySelector(".top-box");
    if (topBox) {
      topBox.style.backgroundColor = tabColor;
    } else {
      document.querySelector("#weather").parentElement.style.backgroundColor =
        tabColor;
    }

    document.querySelector("#searchBox").style.backgroundColor = tabColor;

    const middleBox = document.querySelector(".middle-box");
    if (middleBox) {
      middleBox.style.backgroundColor = tabColor;
    }

    const middleLink =
      document.querySelector(".middle-box a") ||
      document.querySelector("#middle-box a");
    if (middleLink) {
      middleLink.style.backgroundColor = "transparent";
    }
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
  if (code <= 3) return isDay ? "Cloudy" : "Cloudy night";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 86) return "Snowing";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}
