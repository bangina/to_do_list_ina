const weather = document.querySelector('.js-weather');
const API_KEYS = "8653a95ea47a33fcf421ac702c5111cb";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.sys.country;
            weather.innerText = "🌈 " + temperature + "  🌐  " + place;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위치정보 불러오기 성공했을 시(사용자가 승인했을 시)
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        //객체에 변수의 이름(latitude)과 객체의 key 이름을 같게 저장할 때는 위와 같이 변수명만 적어도 됨.(원래는 latitude:latitude)
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

//위치정보 불러오지 못 했을 때
function handleGeoError() {
    console.log('cannot access geo location');
}

//navigator로 현재 위치 불러오기(불러오기 성공시, 실패시)
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

//코드 불러오기
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords == null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();