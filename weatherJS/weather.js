class Weather {
    constructor(city) {
        this.apiKey = '35db36acbcbc1bbb3a51dddc936b3867';       
        this.city = city;
        // this.state = state;
    }

    // Fetch Current Weather From API
    async getWeather() {
        // const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}&units=metric`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
        const responseData = await response.json();
        // console.log(responseData)
        return responseData;
    }
    
    
    // Change Weather Location
    changeLocation(city) {
        this.city = city;
    }
}
