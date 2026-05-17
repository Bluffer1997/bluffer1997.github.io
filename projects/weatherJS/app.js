// Initialize Storage 
const storage = new Storage();
// Get Stored Location Data
const weatherLocation = storage.getLocationData();

// Initialize Weather Object (class)
const weather = new Weather(weatherLocation.city);

// Initialize UI 
const ui = new UI();

// Get Weather on DOM Load
document.addEventListener('DOMContentLoaded', getWeather)

// Change Location Event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    // Change Location
    weather.changeLocation(city);

    // Set Location in Storage
    storage.setLocationData(city);

    // Get and Display Weather
    getWeather();
    // Close Modal
    $('#locModal').modal('hide');
});

function getWeather () {
    weather.getWeather()
        .then(results => {
            ui.paint(results);
        })
        .catch(err => console.log(err))
}


const metresPerSecondToMilesPerHour = (mps) => {
    let milesPerSecond = 0;
    let milesPerHour = 0;
    let milesPerHourRounded = 0;
    
    milesPerSecond = mps / 1609.34;
    milesPerHour = milesPerSecond * 3600;
    milesPerHourRounded = Math.round(milesPerHour);
    return milesPerHourRounded;
}

const windDirectionFromDegrees = (deg) => {
    if (deg <= 44) {
        return 'North';
    } else if (deg <= 89) {
        return 'North Easterly';
    } else if (deg <= 134) {
        return 'Easterly';
    } else if (deg <= 179) {
        return 'South Easterly';
    } else if (deg <= 224) {
        return 'South';
    } else if (deg <= 269) {
        return 'South Westerly'
   } else if (deg <= 314) {
       return 'Westerly'
   } else {
       return 'North Westerly'
   }
}