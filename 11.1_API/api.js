async function getWeather() {
    const city = document.getElementById('city').value;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2a3d2f97b6ae7ee41823afe5ff7b33d9`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        
    }

    const data = await response.json();
    console.log(data)
    document.getElementById('weatherData').textContent = 
    `The weather in ${city} is ${data.list[0].weather[0].description} 
    with a temperature of ${Math.round(data.list[0].main.temp - 273.15)}°C.`;
}