const API_key = "c71c05acf7e73fe58fee3e16b660a290";
const lat = 41;
const lon = 60;
const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

const container = document.querySelector(".weekly-forecast");

function translateToUzbek(desc) {
  const dict = {
    "clear sky": "ochiq osmon",
    "few clouds": "biroz bulutli",
    "scattered clouds": "tarqoq bulutlar",
    "broken clouds": "qisman bulutli",
    "shower rain": "yomg‘irli",
    rain: "yomg‘ir",
    thunderstorm: "momaqaldiroq",
    snow: "qor",
    mist: "tuman",
  };
  return dict[desc] || desc;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const grouped = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        const time = item.dt_txt.split(" ")[1];
        if (time.startsWith("12:00")) {
          grouped[date] = item;
        }
      });

      container.innerHTML = "";
      Object.keys(grouped).forEach((date) => {
        const item = grouped[date];
        const temp = Math.round(item.main.temp - 273.15);
        const desc = translateToUzbek(item.weather[0].description);
        const icon = item.weather[0].icon;

        const dateStr = new Date(date).toLocaleDateString("uz-UZ", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        container.innerHTML += `
          <div class="forecast-item">
            <h3>${dateStr}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
            <p>${temp}°C, ${desc}</p>
          </div>
        `;
      });
    })
    .catch((err) => {
      container.innerHTML = "<p>Xatolik yuz berdi: maʼlumot yuklanmadi.</p>";
      console.error(err);
    });
});

  const themeBtn = document.getElementById("theme-btn");

  function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  }

  themeBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    setTheme(isDark);
  });

  window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("darkMode") === "true";
    setTheme(saved);
  });
