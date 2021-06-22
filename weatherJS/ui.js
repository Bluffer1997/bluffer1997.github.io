class UI {
    constructor() {
        this.location = document.getElementById('w-location')
        this.desc = document.getElementById('w-desc')
        this.string = document.getElementById('w-string')
        this.details = document.getElementById('w-details')
        this.icon = document.getElementById('w-icon')
        this.humidity = document.getElementById('w-humidity')
        this.feelsLike = document.getElementById('w-feels-like')
        this.pressure = document.getElementById('w-pressure')
        this.windSpeed = document.getElementById('w-windSpeed')
        this.windDirection = document.getElementById('w-windDirection')
    }

    paint(weather) {
        // this.location.textContent = `${weather.name}, ${weather.sys.country}`;
        this.location.textContent = `${weather.name}`;
        this.desc.textContent = weather.weather[0].main;
        this.string.textContent = `${weather.main.temp.toFixed(1)}\u00B0C`;
        // this.icon.setAttribute('src', weather.weather.icon);
        this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like.toFixed(0)}\u00B0C`;
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
        this.pressure.textContent = `Pressure: ${weather.main.pressure}hPa`;
        this.windSpeed.textContent = `Wind Speed: ${metresPerSecondToMilesPerHour(weather.wind.speed)} mph`;
        this.windDirection.textContent = `Wind Direction: ${windDirectionFromDegrees(weather.wind.deg)}`;
    }
}
