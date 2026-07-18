const LAT = 43.6532;
const LON = -79.3832;

const weatherImages = {
  0: 'WINDOWS_XP.jpg',       
  1: 'WINDOWS_XPCLOUDY.jpg',       
  2: 'WINDOWS_XPCLOUDY.jpg',    
  3: 'WINDOWS_XPCLOUDY.jpg',   
  45: 'WINDOWS_XPFOGGY.jpg',     
  48: 'WINDOWS_XPFOGGY.jpg',     
  51: 'WINDOWS_XPRAINY.jpg',    
  61: 'WINDOWS_XPRAINY.jpg',
  71: 'WINDOWS_XPSNOWY.jpg',     
  95: 'WINDOWS_XPTHUNDERSTORM.jpg' 
};

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=auto`
    );
    const data = await response.json();

    const temp = data.current.temperature_2m;
    const code = data.current.weather_code;

    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `~${temp}°C<br>Toronto`;

    const imageName = weatherImages[code] || 'WINDOWS_XP.jpg';
    document.body.style.backgroundImage = `url('src/${imageName}')`;
    
  } catch (error) {
    console.error("Could not fetch weather:", error);
    document.body.style.backgroundImage = `url('src/WINDOWS_XP.jpg')`;
  }
}

fetchWeather();

const searchBox = document.getElementById('searchBox');
if (searchBox) {
  searchBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchBox.value)}`;
    }
  });
}
