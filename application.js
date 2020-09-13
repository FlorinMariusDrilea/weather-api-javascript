window.addEventListener('load', ()=> {
    // declare all variables to be used
    let country;
    let temperatureDescription = document.querySelector('.t-description');
    let temperatureDegree = document.querySelector('.t-degree');
    let locationTimezone = document.querySelector('.location');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');
    var salam = document.getElementById("salam"); 
    var rain = document.getElementById("rain");
    var normal = document.getElementById("normal");
    
    // declare searchBox variables
    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', setQuery);

    // if press "enter" then search for the city with the api
    function setQuery(evt) {
        if (evt.keyCode == 13) {
            country = searchbox.value;
            console.log(country);
            const api = `http://api.weatherstack.com/current?access_key=8d6499ef522849c7027f39a5f33925a7&query=${country}`;
            search(api);
        }
        
        // get data
        function search(api){
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    // get all data from the api
                    console.log(data);
                    const {temperature, weather_descriptions} = data.current;
                    const {country, name} = data.location;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = name + ", " + country;
                    temperatureSpan.textContent = 'C';

                    // Formula to change from F to C
                    let farenheit = Math.floor((temperature/5) * 9 + 32);

                    // Set Icon
                    // setIcons(weather_icons, document.querySelector('.icon'));
                    
                    // change song and background
                    // depending on the grades (temperature)
                    if(temperature > 25) {
                        document.body.style.background = "linear-gradient(to right, #f12711, #f5af19)";
                        // song settings
                        salam.play();
                        rain.pause();
                        rain.currentTime = 0;
                        normal.pause();
                        normal.currentTime = 0;
                    } else if(temperature >= 10  && temperature <= 25) {
                        document.body.style.background = "linear-gradient(to right, #22c1c3, #fdbb2d)";
                        // song settings
                        salam.pause();
                        salam.currentTime = 0;
                        rain.pause();
                        rain.currentTime = 0;
                        normal.play();
                    } else if(temperature < 10) {
                        document.body.style.background = "linear-gradient(rgb(47, 120, 150), rgb(20, 40,130))";
                        // song settings
                        rain.play();
                        salam.pause();
                        salam.currentTime = 0;
                        normal.pause();
                        normal.currentTime = 0;
                    }

                    // Change temperature to Celsius/F
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = farenheit;
                            console.log(temperatureDegree);
                        } else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        }
}

    function setIcons(icon, iconID) {
        const skycons = new Skycons({colors: "white"});
        const currentIcon = icon.replace(weather, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});