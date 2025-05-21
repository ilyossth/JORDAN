const API_key = "c71c05acf7e73fe58fee3e16b660a290";
const lat = 41;
const lon = 60;
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

const cityName = document.querySelector(".city-name");
const forecastContainer = document.querySelector(".forecast");
const tomorrowBtn = document.getElementById("show-tomorrow");

function showForecast(filterFunc) {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      cityName.innerHTML = data.city.name;

      const filteredForecasts = data.list.filter(filterFunc);

      forecastContainer.innerHTML = "";
      filteredForecasts.forEach(item => {
        const time = item.dt_txt.split(" ")[1].slice(0, 5);
        const temp = Math.round(item.main.temp - 273.15);
        const description = item.weather[0].description;

        forecastContainer.innerHTML += `
          <div class="forecast-item">
            <p><strong>${time}</strong> - ${temp}°C, ${description}</p>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
}

// Bugungi ob-havoni sahifa yuklanganda ko‘rsat
const today = new Date().getDate();
showForecast(item => new Date(item.dt_txt).getDate() === today);

// Tugma bosilganda ertangi ob-havoni ko‘rsat
tomorrowBtn.addEventListener("click", () => {
  const tomorrow = new Date().getDate() + 1;
  showForecast(item => new Date(item.dt_txt).getDate() === tomorrow);
});