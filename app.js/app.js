const API_key = "c71c05acf7e73fe58fee3e16b660a290";

const lat = 41;
const lon = 60;

let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;

let cityName = document.querySelector(".city-name")
let degree = document.querySelector(".degree")
let wInfo = document.querySelector(".weather-info")
let coordd = document.querySelector(".coord")
fetch(URL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const { name, coord, main, weather } = data
        cityName.innerHTML=name;
        degree.innerHTML = Math.floor(main.temp - 273) + " C*";
        wInfo.innerHTML = weather[0].description;
        coordd.innerHTML= `kordinatalar:${coord.lon}:${coord.lat}`;
        console.log(name);
        console.log(coord);
        console.log(main);
        console.log(weather[0].description);
    });
