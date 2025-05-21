const API_key = "c71c05acf7e73fe58fee3e16b660a290";
const lat = 41;
const lon = 60;
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

const cityName = document.querySelector(".city-name");
const forecastContainer = document.querySelector(".forecast");
const tomorrowBtn = document.getElementById("show-tomorrow");

function translateToUzbek(desc) {
  const dict = {
    "clear sky": "ochiq osmon",
    "few clouds": "biroz bulutli",
    "scattered clouds": "tarqoq bulutlar",
    "broken clouds": "qisman bulutli",
    "shower rain": "yomg‘irli",
    "rain": "yomg‘ir",
    "thunderstorm": "momaqaldiroq",
    "snow": "qor",
    "mist": "tuman"
  };
  return dict[desc] || desc;
}

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
        const description = translateToUzbek(item.weather[0].description);
        const icon = item.weather[0].icon;

        forecastContainer.innerHTML += `
          <div class="forecast-item">
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
            <p><strong>${time}</strong> - ${temp}°C, ${description}</p>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 1;

  const todayStr = new Date().toDateString();
  showForecast(item => new Date(item.dt_txt).toDateString() === todayStr);
});

tomorrowBtn.addEventListener("click", () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();

  showForecast(item => new Date(item.dt_txt).toDateString() === tomorrowStr);
});

const nextBtn = document.getElementById("go-next");
if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "next.html"; // O‘zgartiring
    }, 700);
  });
}
