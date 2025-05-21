const API_key = "c71c05acf7e73fe58fee3e16b660a290";
const lat = 41;
const lon = 60;

let URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    const cityName = document.querySelector(".city-name");
    const forecastContainer = document.querySelector(".forecast");

    cityName.innerHTML = data.city.name;

    const today = new Date().getDate();

    const tomorrowForecasts = data.list.filter((item) => {
      const date = new Date(item.dt_txt);
      return date.getDate() === today + 1;
    });

    forecastContainer.innerHTML = "";
    tomorrowForecasts.forEach((item) => {
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
  .catch((err) => {
    console.error("Xatolik yuz berdi:", err);
  });
